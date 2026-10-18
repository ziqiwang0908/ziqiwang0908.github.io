# ziqiwang0908.github.io

Personal homepage of Ziqi (Olivia) Wang — https://ziqiwang0908.github.io/

A plain static site (no build step; `.nojekyll` tells GitHub Pages to serve files as-is).

| What | Where |
| --- | --- |
| Page content | `index.html` |
| Styles (colors are CSS variables at the top) | `assets/style.css` |
| Nav highlight, dark mode, figure lightbox | `assets/main.js` |
| Paper figures | `images/papers/` |
| School / company logos | `images/logos/` |
| Paper PDFs | `files/papers/` |

**Add a paper:** copy one `<article class="pub">` block in `index.html`, drop its figure into
`images/papers/` and its PDF into `files/papers/`, then update the title, authors, venue, and links.

**Preview locally:** `python -m http.server 8000` in this folder, then open http://localhost:8000.
