import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Endast använd tag-namn (header/footer)
async function autoDetectSelector(page, type) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Vänta så att sidan hinner laddas

  return await page.evaluate((type) => {
    const tagName = type.toLowerCase();
    const el = document.querySelector(tagName);
    return el ? tagName : null;
  }, type);
}

async function extractSection(page, selector, name, baseUrl, outputPath) {
  if (!selector) {
    console.warn(`⚠️ Ingen selector hittades för ${name}.`);
    return;
  }

  try {
    await page.waitForSelector(selector, { visible: true, timeout: 20000 }); // Vänta tills elementet är synligt
  } catch {
    console.warn(`⚠️ Timeout: Elementet "${selector}" blev inte synligt.`);
    return;
  }

  const exists = await page.$(selector);
  if (!exists) {
    console.warn(`❌ Elementet "${selector}" hittades inte på sidan.`);
    return;
  }

  const html = await page.evaluate((selector) => {
    const el = document.querySelector(selector);
    if (!el) {
      console.log("⚠️ EVALUATE: Elementet kunde inte hittas med selektor:", selector);
      return null;
    }
    return el.outerHTML; // Byt till outerHTML
  }, selector);

  if (!html || html.trim() === "") {
    console.warn(`❌ Inget innehåll extraherat från "${selector}".`);
    await page.screenshot({ path: `debug-${name}.png` }); // Ta en skärmdump
    const pageHtml = await page.content();
    fs.writeFileSync(`debug-${name}.html`, pageHtml, 'utf-8'); // Spara HTML för felsökning
    return;
  }

  // Hämta <style>-innehåll och externa CSS-filer
  const allHeadCss = await page.evaluate((base) => {
    const cssParts = [];
    document.querySelectorAll("style").forEach(styleTag => {
      cssParts.push(`/* <style> */\n${styleTag.innerHTML}`);
    });
    const linkHrefs = Array.from(document.querySelectorAll("link[rel='stylesheet'][href]"))
      .map(link => new URL(link.getAttribute("href"), base).href);
    return { cssParts, linkHrefs };
  }, baseUrl.origin);

  let externalCssContent = "";
  for (const href of allHeadCss.linkHrefs) {
    try {
      const res = await page.goto(href);
      const text = await res.text();
      externalCssContent += `\n/* ${href} */\n${text}`;
    } catch {
      console.warn(`⚠️ Kunde inte hämta extern CSS: ${href}`);
    }
  }

  const finalCss = `${allHeadCss.cssParts.join("\n")}\n${externalCssContent}\n\n/* Inline styles */\n${inlineCss}`;

  let htmlWithCss = html;
  if (htmlWithCss.includes("<head")) {
    htmlWithCss = htmlWithCss.replace(
      /<head[^>]*>/i,
      match => `${match}\n  <link rel="stylesheet" href="${name}.css">`
    );
  } else {
    htmlWithCss = `<link rel="stylesheet" href="${name}.css">\n` + htmlWithCss;
  }

  fs.writeFileSync(path.join(outputPath, `${name}.html`), htmlWithCss, "utf-8");
  fs.writeFileSync(path.join(outputPath, `${name}.css`), finalCss, "utf-8");

  console.log(`✅ Sparat: ${name}.html & ${name}.css`);
}

async function parsePage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const baseUrl = new URL(url);
  const domain = baseUrl.hostname;
  const outputPath = path.join('output', domain);
  fs.mkdirSync(outputPath, { recursive: true });

  // Auto-detect header/footer via tagname
  const headerSelector = await autoDetectSelector(page, 'header');
  const footerSelector = await autoDetectSelector(page, 'footer');

  console.log(`\n🔍 Header-selector: ${headerSelector || '❌ ingen <header> hittad'}`);
  console.log(`🔍 Footer-selector: ${footerSelector || '❌ ingen <footer> hittad'}`);

  await extractSection(page, headerSelector, 'header', baseUrl, outputPath);
  await extractSection(page, footerSelector, 'footer', baseUrl, outputPath);

  await browser.close();
}

// Startpunkt
const [,, inputUrl] = process.argv;

if (!inputUrl) {
  console.log(`
🧾 Användning:
  node puppeteer-parser.js <URL>

📌 Exempel:
  node puppeteer-parser.js https://www.raddabarnen.se
`);
  process.exit(1);
}

parsePage(inputUrl);
