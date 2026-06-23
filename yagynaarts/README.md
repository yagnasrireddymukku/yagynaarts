# Yagyna Arts — React (Vite) Store

A React + Vite port of the Yagyna Arts premium resin-art store. Same design system,
catalog, cart, wishlist and Google-Sheet form delivery as the static site.

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
```

## Build for production
```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Tech
- React 18 + React Router (HashRouter — works on any static host, incl. GitHub Pages)
- Vite build
- Bootstrap 5 (grid/utilities) + Bootstrap Icons + Google Fonts via CDN (see `index.html`)
- localStorage for cart / wishlist / accounts (no backend)
- Forms post to a Google Apps Script → Google Sheet + email (config in `src/lib/site.js`)

## Project structure
```
src/
  data/        catalog.js (products, collections, categories), blog.js
  context/     CartContext, AuthContext
  lib/         site.js  ← BRAND, WhatsApp number, Google Sheet endpoint, nav
  components/  Header, Footer, Layout, ProductCard, CartDrawer, SearchOverlay, ...
  pages/       Home (full) + Placeholder (other routes, being ported in stages)
  styles/      style.css, animations.css, experience.css (ported verbatim)
public/assets/ images + icons
```

## Configuration
Edit **`src/lib/site.js`**:
- `BRAND.whatsapp`, `BRAND.email`, social links
- `FORMS_ENDPOINT` — your Google Apps Script Web App URL (orders/contact/etc.)

## Conversion status
- ✅ Project scaffold, routing, design system, data, contexts (cart/wishlist/auth), shared UI
- ✅ **Home page** fully ported
- 🔜 Shop, Product, Cart, Checkout, Collections, Custom Orders, Blog, account & content
  pages — currently routed to a placeholder, being ported in stages.

## Deploy to GitHub Pages (automated)
1. Create a repo on your account and push this folder (see commands below).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

### First push
```bash
git init
git add .
git commit -m "Yagyna Arts — React store (stage 1)"
git branch -M main
git remote add origin https://github.com/yagnasrireddymukku/yagyna-arts.git
git push -u origin main
```
Then enable Pages as in step 2. Your site will be live at
`https://yagnasrireddymukku.github.io/yagyna-arts/`.
