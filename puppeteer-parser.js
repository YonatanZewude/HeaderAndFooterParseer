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
    await page.waitForSelector(selector, { visible: true, timeout: 30000 }); // Vänta tills elementet är synligt
  } catch {
    console.warn(`⚠️ Timeout: Elementet "${selector}" blev inte synligt.`);
    return;
  }

  // Extrahera HTML och konvertera relativa länkar till absoluta
  const { html, inlineCss } = await page.evaluate((selector, base) => {
    const el = document.querySelector(selector);
    if (!el) return { html: null, inlineCss: "" };

    const clone = el.cloneNode(true);

    // Konvertera relativa länkar till absoluta
    clone.querySelectorAll("[href], [src]").forEach(tag => {
      if (tag.hasAttribute("href")) {
        tag.setAttribute("href", new URL(tag.getAttribute("href"), base).href);
      }
      if (tag.hasAttribute("src")) {
        tag.setAttribute("src", new URL(tag.getAttribute("src"), base).href);
      }
    });

    // Extrahera inline-styles som CSS-klasser
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

  // Hämta <style>-innehåll, externa CSS-filer och externa JavaScript-filer
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

  // Hämta innehåll från externa CSS-filer
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

  // Lägg till CSS och JavaScript i HTML
  let htmlWithCss = html;
  let headContent = '';

  if (metaViewport) {
    headContent += `${metaViewport}\n`;
  } else {
    headContent += `<meta name="viewport" content="width=device-width, initial-scale=1">\n`;
  }

  headContent += `<link rel="stylesheet" href="${name}.css">\n`;

  for (const scriptSrc of externalScripts) {
    headContent += `<script src="${scriptSrc}" defer></script>\n`;
  }

  if (htmlWithCss.includes("<head")) {
    htmlWithCss = htmlWithCss.replace(
      /<head[^>]*>/i,
      match => `${match}\n${headContent}`
    );
  } else {
    htmlWithCss = `<head>\n${headContent}</head>\n` + htmlWithCss;
  }

  // Spara HTML och CSS
  fs.writeFileSync(path.join(outputPath, `${name}.html`), htmlWithCss, "utf-8");
  fs.writeFileSync(path.join(outputPath, `${name}.css`), finalCss, "utf-8");

  console.log(`✅ Sparat: ${name}.html & ${name}.css`);
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
