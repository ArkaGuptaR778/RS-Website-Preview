Client and partner logos for the home-page "Trusted by" strip (one auto-scrolling row).

Included — official marks, unaltered artwork (only the SVG canvas was trimmed to the logo's edges):
  visa.svg, mastercard.svg, amex.svg, discover.svg   from the CC0 "logos" collection (github.com/gilbarbara/logos)
  elavon.svg, hitachi.svg, icici.svg                 from the CC0 Simple Icons / theSVG collections (brand colours)
  sbi.png                                            State Bank of India symbol, 48 px (replace with a vector from SBI's brand kit)

Added Oct 2026 from images supplied by RS (white background made transparent, trimmed; artwork unchanged):
  worldpay.png, metabank.png, npci.png, ntt-data.png, deloitte.png, authorize-net.png
  These are small (27-50 px tall). Swap in vector .svg files from each brand's press kit when available:
  same name with .svg is picked up automatically (svg is preferred over png).

To add or replace one: save the official file here with that exact name (.svg preferred; .png/.webp work),
then rebuild (`npm run build`). The logo is picked up by name from `content/home.md` (## clients, logo=… height=…).
Trademarks belong to their owners — use each brand's approved artwork, and confirm permission to show it.
