import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function parsePage(url, headerSelector, footerSelector) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });
  const baseUrl = new URL(url);
  const domain = baseUrl.hostname;
  const outputPath = path.join('output', domain);
  fs.mkdirSync(outputPath, { recursive: true });

  const extractSection = async (selector, name) => {
    const exists = await page.$(selector);
    if (!exists) {
      console.error(`❌ Hittade inte elementet "${selector}"`);
      return;
    }

    const { html, css } = await page.evaluate((selector, name, base) => {
      const el = document.querySelector(selector);
      if (!el) return { html: "", css: "" };

      const clone = el.cloneNode(true);

      // Konvertera alla länkar till absoluta URL:er
      clone.querySelectorAll("a[href], link[href], img[src], script[src]").forEach(tag => {
        if (tag.hasAttribute("href")) {
          const absHref = new URL(tag.getAttribute("href"), base).href;
          tag.setAttribute("href", absHref);
        }
        if (tag.hasAttribute("src")) {
          const absSrc = new URL(tag.getAttribute("src"), base).href;
          tag.setAttribute("src", absSrc);
        }
      });

      // Extrahera inline-styles till CSS
      const styles = [];
      let counter = 0;
      clone.querySelectorAll("[style]").forEach(tag => {
        const className = `${name}-style-${counter++}`;
        styles.push(`.${className} { ${tag.getAttribute("style")} }`);
        tag.classList.add(className);
        tag.removeAttribute("style");
      });

      return {
        html: clone.outerHTML,
        css: styles.join("\n")
      };
    }, selector, name, baseUrl.origin);

    fs.writeFileSync(path.join(outputPath, `${name}.html`), html, "utf-8");
    fs.writeFileSync(path.join(outputPath, `${name}.css`), css, "utf-8");
    console.log(`✅ Sparat: ${name}.html & ${name}.css i ${outputPath}/`);
  };

  await extractSection(headerSelector, 'header');
  await extractSection(footerSelector, 'footer');

  await browser.close();
}

const [,, inputUrl, headerSel, footerSel] = process.argv;

if (!inputUrl || !headerSel || !footerSel) {
  console.log(`
🧾 Användning:
  node puppeteer-parser.js <URL> <header-selector> <footer-selector>

📌 Exempel:
  node puppeteer-parser.js https://www.raddabarnen.se .top-bar footer
`);
  process.exit(1);
}

parsePage(inputUrl, headerSel, footerSel);
