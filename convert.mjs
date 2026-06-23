/* =====================================================================
   HTML -> React converter for the Resin Rainbow site.
   For each .html page it produces, under src/pages/:
     <Comp>.body.html  – the <body> markup (scripts/styles stripped)
     <Comp>.css        – all <style> blocks concatenated
     <Comp>.script.js  – all inline <script> code concatenated
     <Comp>.jsx        – a React component that renders the body and,
                         on mount, injects the page CSS + runs the script
   Also writes src/routes.jsx.
   CSS & JS are injected on mount and removed on unmount, so each page is
   self-contained and styles never leak between routes (mirrors the
   original multi-document behaviour).
===================================================================== */
import fs from 'node:fs';
import path from 'node:path';

const SRC = path.resolve('../r');
const OUT = path.resolve('src/pages');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { file: 'index.html',            comp: 'Home',          path: '/' },
  { file: 'about.html',            comp: 'About',         path: '/about' },
  { file: 'collections.html',      comp: 'Collections',   path: '/collections' },
  { file: 'subcollection.html',    comp: 'Subcollection', path: '/subcollection' },
  { file: 'gallery.html',          comp: 'Gallery',       path: '/gallery' },
  { file: 'blog.html',             comp: 'Blog',          path: '/blog' },
  { file: 'contact.html',          comp: 'Contact',       path: '/contact' },
  { file: 'privacy.html',          comp: 'Privacy',       path: '/privacy' },
  { file: 'refund.html',           comp: 'Refund',        path: '/refund' },
  { file: 'shipping.html',         comp: 'Shipping',      path: '/shipping' },
  { file: 'terms.html',            comp: 'Terms',         path: '/terms' },
  { file: 'return&exchange.html',  comp: 'ReturnExchange',path: '/return-exchange' },
];

// internal .html link -> SPA route (longest keys first to avoid partial hits)
const LINKMAP = [
  ['return&exchange.html', '/return-exchange'],
  ['subcollection.html',   '/subcollection'],
  ['collections.html',     '/collections'],
  ['shipping.html',        '/shipping'],
  ['gallery.html',         '/gallery'],
  ['contact.html',         '/contact'],
  ['privacy.html',         '/privacy'],
  ['refund.html',          '/refund'],
  ['terms.html',           '/terms'],
  ['about.html',           '/about'],
  ['blog.html',            '/blog'],
  ['index.html',           '/'],
];

function rewriteLinks(s) {
  for (const [from, to] of LINKMAP) s = s.split(from).join(to);
  return s;
}
// make asset references absolute so they resolve from any route
function rewriteAssets(s) {
  return s.replace(/([("'`])assets\//g, '$1/assets/');
}

function extractAll(re, str) {
  const out = [];
  let m;
  while ((m = re.exec(str)) !== null) out.push(m[1]);
  return out;
}

for (const page of PAGES) {
  const full = fs.readFileSync(path.join(SRC, page.file), 'utf8');

  const titleM = full.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleM ? titleM[1].trim() : 'Resin Rainbow';

  // all <style> blocks (head or body)
  const css = extractAll(/<style[^>]*>([\s\S]*?)<\/style>/gi, full).join('\n\n');

  // inline <script> blocks: skip external (src=) and non-JS (e.g. application/ld+json)
  const scriptBlocks = [];
  const reScript = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let sm;
  while ((sm = reScript.exec(full)) !== null) {
    const attrs = sm[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const tm = attrs.match(/type\s*=\s*["']([^"']+)["']/i);
    const type = tm ? tm[1].toLowerCase() : '';
    const JS_TYPES = ['', 'text/javascript', 'application/javascript', 'module'];
    if (!JS_TYPES.includes(type)) continue; // e.g. application/ld+json
    scriptBlocks.push(sm[2]);
  }
  const scriptCode = scriptBlocks.join('\n\n');

  // body inner HTML, with style/script tags removed
  const bodyM = full.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyM ? bodyM[1] : full;
  body = body.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  body = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<script[^>]*\/>/gi, '');

  const bodyOut   = rewriteAssets(rewriteLinks(body)).trim();
  const cssOut    = rewriteAssets(css).trim();
  const scriptOut = rewriteAssets(rewriteLinks(scriptCode)).trim();

  // function names to publish on window (inline on* handlers in generated
  // markup look these up globally)
  const fnNames = [...new Set(extractAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g, scriptOut))];

  fs.writeFileSync(path.join(OUT, `${page.comp}.body.html`), bodyOut, 'utf8');
  fs.writeFileSync(path.join(OUT, `${page.comp}.css`), cssOut, 'utf8');
  fs.writeFileSync(path.join(OUT, `${page.comp}.script.js`), scriptOut, 'utf8');

  const jsx = `import { useLayoutEffect } from 'react';
import body from './${page.comp}.body.html?raw';
import css from './${page.comp}.css?raw';
import script from './${page.comp}.script.js?raw';

const TITLE = ${JSON.stringify(title)};
const EXPOSE = ${JSON.stringify(fnNames)};

export default function ${page.comp}() {
  useLayoutEffect(() => {
    document.title = TITLE;
    window.scrollTo(0, 0);

    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-page', '${page.comp}');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    let scriptEl = null;
    if (script && script.trim()) {
      scriptEl = document.createElement('script');
      scriptEl.textContent =
        '(function(){\\n' + script + '\\n' +
        EXPOSE.map((n) => 'try{window.' + n + '=' + n + ';}catch(e){}').join('') +
        '\\n})();';
      document.body.appendChild(scriptEl);
    }

    return () => {
      styleEl.remove();
      if (scriptEl) scriptEl.remove();
    };
  }, []);

  return <div className="rr-page rr-${page.comp.toLowerCase()}" dangerouslySetInnerHTML={{ __html: body }} />;
}
`;
  fs.writeFileSync(path.join(OUT, `${page.comp}.jsx`), jsx, 'utf8');
  console.log(`✓ ${page.file} -> ${page.comp}.jsx (css ${cssOut.length}b, js ${scriptOut.length}b, fns ${fnNames.length})`);
}

// routes.jsx
const imports = PAGES.map((p) => `import ${p.comp} from './pages/${p.comp}.jsx';`).join('\n');
const arr = PAGES.map((p) => `  { path: ${JSON.stringify(p.path)}, Comp: ${p.comp} },`).join('\n');
fs.writeFileSync(
  path.resolve('src/routes.jsx'),
  `${imports}\n\nexport const routes = [\n${arr}\n];\n`,
  'utf8'
);
console.log('✓ src/routes.jsx');
console.log('Done.');
