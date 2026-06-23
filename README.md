# Resin Rainbow — React (Vite)

The static `r/` site converted into a React + Vite single-page app with client-side routing.

## Run

```bash
cd r-react
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # serve the production build
```

## How it's structured

- `src/main.jsx` — app entry (BrowserRouter).
- `src/App.jsx` — route table + a global click-interceptor so internal `<a href="/...">`
  links navigate via the SPA router instead of full page reloads.
- `src/routes.jsx` — generated list of `{ path, Comp }`.
- `src/pages/<Page>.jsx` — one React component per original HTML page. Each renders its
  markup and, on mount, injects that page's CSS + runs its original script. CSS and JS are
  **scoped to the page lifetime** (added on mount, removed on unmount), so styles never
  leak between routes — mirroring the original multi-document behaviour.
- `src/pages/<Page>.body.html` / `.css` / `.script.js` — the extracted markup, styles and
  script for each page (imported with Vite's `?raw`).
- `public/assets/` — images & videos (referenced as `/assets/...`).
- `convert.mjs` — the converter. Re-run with `npm run convert` after editing the source
  files in `../r` to regenerate the page components.

### Route map

| Route | Original file |
|-------|---------------|
| `/` | index.html |
| `/about` | about.html |
| `/collections` | collections.html |
| `/subcollection` (`?tab=`) | subcollection.html |
| `/gallery` | gallery.html |
| `/blog` | blog.html |
| `/contact` (`?item=`) | contact.html |
| `/privacy` `/refund` `/shipping` `/terms` `/return-exchange` | policy pages |

## Notes

- Internal links and asset paths were rewritten (`about.html` → `/about`, `assets/...` → `/assets/...`).
- The page markup is embedded via `dangerouslySetInnerHTML` to preserve the original design,
  SVGs and behaviour exactly. To refactor a page into hand-written JSX components with React
  state/hooks, start from its `.body.html` + `.script.js`.
- `StrictMode` is intentionally omitted (its dev double-invoke would run the imperative page
  scripts twice).
- Pre-existing content bug carried over from the source: `privacy.html` and `terms.html` have
  leftover "Fenty Beauty" `<title>` text — fix in `../r` and re-run `npm run convert`, or edit
  `src/pages/Privacy.jsx` / `Terms.jsx` `TITLE`.
