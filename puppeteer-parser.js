import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

async function autoDetectSelector(page, type) {
  await new Promise(resolve => setTimeout(resolve, 2000));

  return await page.evaluate((type) => {
    const tagName = type.toLowerCase();
    const el = document.querySelector(tagName);
    if (el) return tagName;

    if (type === 'header') {
      const fallback = document.querySelector('#header-top');
      return fallback ? '#header-top' : null;
    }

    if (type === 'footer') {
      const fallback = document.querySelector('footer, #footer, .footer');
      return fallback
        ? (fallback.id ? `#${fallback.id}` : `.${fallback.className.split(' ').join('.')}`)
        : null;
    }

    return null;
  }, type);
}

async function extractSection(page, selector, name, baseUrl, outputPath) {
  if (!selector) {
    console.warn(`⚠️ Ingen selector hittades för ${name}.`);
    return;
  }

  try {
    await page.waitForSelector(selector, { visible: true, timeout: 30000 });
  } catch {
    console.warn(`⚠️ Timeout: Elementet "${selector}" blev inte synligt.`);
    return;
  }

  const { html, inlineCss } = await page.evaluate((selector, base) => {
    const el = document.querySelector(selector);
    if (!el) return { html: null, inlineCss: "" };

    const clone = el.cloneNode(true);

    clone.querySelectorAll("[href], [src]").forEach(tag => {
      if (tag.hasAttribute("href")) {
        tag.setAttribute("href", new URL(tag.getAttribute("href"), base).href);
      }
      if (tag.hasAttribute("src")) {
        tag.setAttribute("src", new URL(tag.getAttribute("src"), base).href);
      }
    });

    const styles = [];
    let counter = 0;
    clone.querySelectorAll("[style]").forEach(tag => {
      const styleValue = tag.getAttribute("style")?.trim();
      if (styleValue) {
        const className = `${name}-style-${counter++}`;
        styles.push(`.${className} { ${styleValue} }`);
        tag.classList.add(className);
        tag.removeAttribute("style");
      }
    });

    return {
      html: clone.outerHTML,
      inlineCss: styles.join("\n")
    };
  }, selector, baseUrl.origin);

  if (!html || html.trim() === "") {
    console.warn(`❌ Inget innehåll extraherat från "${selector}".`);
    return;
  }

  const { cssParts, externalCssLinks, externalScripts, metaViewport } = await page.evaluate((base) => {
    const cssParts = [];
    document.querySelectorAll("style").forEach(styleTag => {
      cssParts.push(`/* <style> */\n${styleTag.innerHTML}`);
    });

    const externalCssLinks = Array.from(document.querySelectorAll("link[rel='stylesheet'][href]"))
      .map(link => new URL(link.getAttribute("href"), base).href);

    const externalScripts = Array.from(document.querySelectorAll("script[src]"))
      .map(script => new URL(script.getAttribute("src"), base).href);

    const metaViewport = document.querySelector('meta[name="viewport"]')?.outerHTML || '';

    return { cssParts, externalCssLinks, externalScripts, metaViewport };
  }, baseUrl.origin);

  const inlineScripts = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("script:not([src])"))
      .map(script => script.textContent.trim())
      .filter(code => code.length > 0);
  });

  let externalCssContent = "";
  for (const link of externalCssLinks) {
    try {
      const response = await fetch(link);
      if (response.ok) {
        const cssText = await response.text();
        externalCssContent += `/* From ${link} */\n${cssText}\n\n`;
      }
    } catch (error) {
      console.warn(`❌ Kunde inte hämta extern CSS från: ${link}`);
    }
  }

  const finalCss = `${externalCssContent}\n${cssParts.join("\n")}\n\n/* Inline styles */\n${inlineCss}`;

  const scriptsPath = path.join(outputPath, 'scripts');
  fs.mkdirSync(scriptsPath, { recursive: true });

  const localScripts = [];

  for (const scriptSrc of externalScripts) {
    try {
      const response = await fetch(scriptSrc);
      if (response.ok) {
        const scriptText = await response.text();
        const scriptName = path.basename(new URL(scriptSrc).pathname).split('?')[0] || `script${localScripts.length}.js`;
        const localPath = path.join('scripts', scriptName);
        fs.writeFileSync(path.join(scriptsPath, scriptName), scriptText, 'utf-8');
        localScripts.push(localPath);
      } else {
        console.warn(`⚠️ Misslyckades att hämta JS: ${scriptSrc}`);
      }
    } catch (err) {
      console.warn(`❌ Fel vid hämtning av JS: ${scriptSrc}`);
    }
  }

  let inlineScriptPath = null;
  if (inlineScripts.length > 0) {
    const inlineScriptCode = inlineScripts.join("\n\n");
    const inlineScriptName = `${name}-inline.js`;
    inlineScriptPath = path.join('scripts', inlineScriptName);
    fs.writeFileSync(path.join(scriptsPath, inlineScriptName), inlineScriptCode, 'utf-8');
  }

  let headContent = '';
  headContent += metaViewport || `<meta name="viewport" content="width=device-width, initial-scale=1">\n`;
  headContent += `<link rel="stylesheet" href="${name}.css">\n`;
  for (const scriptSrc of localScripts) {
    headContent += `<script src="${scriptSrc}" defer></script>\n`;
  }
  if (inlineScriptPath) {
    headContent += `<script src="${inlineScriptPath}" defer></script>\n`;
  }

  const fullHtmlPage = `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>${name}</title>
  ${headContent}
</head>
<body>
  ${html}
</body>
</html>`;

  fs.writeFileSync(path.join(outputPath, `${name}.html`), fullHtmlPage, "utf-8");
  fs.writeFileSync(path.join(outputPath, `${name}.css`), finalCss, "utf-8");

  console.log(`✅ Sparat: ${name}.html, ${name}.css + JS-filer`);
}

async function parsePage(url, headerSelArg, footerSelArg) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  await new Promise(resolve => setTimeout(resolve, 3000));

  const baseUrl = new URL(url);
  const domain = baseUrl.hostname;
  const outputPath = path.join('output', domain);
  fs.mkdirSync(outputPath, { recursive: true });

  const headerSelector = headerSelArg || await autoDetectSelector(page, 'header');
  const footerSelector = footerSelArg || await autoDetectSelector(page, 'footer');

  console.log(`\n🔍 Header-selector: ${headerSelector || '❌ ingen hittad'}`);
  console.log(`🔍 Footer-selector: ${footerSelector || '❌ ingen hittad'}`);

  await extractSection(page, headerSelector, 'header', baseUrl, outputPath);
  await extractSection(page, footerSelector, 'footer', baseUrl, outputPath);

  await browser.close();
}

const [,, inputUrl, headerSel, footerSel] = process.argv;
parsePage(inputUrl, headerSel, footerSel);
