# 🧩 Header & Footer Parser (Puppeteer)

Detta är ett Node.js-skript som använder Puppeteer för att extrahera `header` och `footer` från en webbsida och sparar dem som HTML- och CSS-filer.

## 🔧 Funktioner

- Laddar valfri webbsida (även JavaScript-renderade)
- Extraherar `header` och `footer` med valfria CSS-selektorer
- Konverterar alla länkar (`href`, `src`) till absoluta URL:er
- Flyttar inline-stilar till externa `.css`-filer
- Sparar 4 filer per sida i `output/<domän>/`:

