/* Brand config + form delivery (Google Sheet + WhatsApp). Edit values here. */
export const BRAND = {
  name: 'Yagyna Arts',
  tagline: 'Handcrafted Resin Creations Made With Love',
  whatsapp: '917997428878',
  email: 'yagynaarts@gmail.com',
  phone: '+91 79974 28878',
  social: {
    instagram: 'https://instagram.com/yagynaarts',
    facebook: 'https://facebook.com/yagynaarts',
    pinterest: 'https://pinterest.com/yagynaarts',
    youtube: 'https://youtube.com/@yagynaarts',
  },
};

// Google Apps Script Web App endpoint (stores submissions in your Sheet + emails you)
const FORMS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzeChPkuXmC5MKYftKZH_2eoVr05uE0sl4IV5e8Qzam1tLw8UE_ZxQIWBuZpGUdEmTddg/exec';

export function recordForm(type, data) {
  if (!FORMS_ENDPOINT) return Promise.resolve({ ok: false, reason: 'no-endpoint' });
  return fetch(FORMS_ENDPOINT, {
    method: 'POST', mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ type, ts: new Date().toISOString(), page: location.hash || '/', data }),
  }).then(() => ({ ok: true })).catch((e) => ({ ok: false, error: String(e) }));
}

export const waLink = (msg) => 'https://wa.me/' + BRAND.whatsapp + '?text=' + encodeURIComponent(msg);

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Experience', to: '/experience' },
  { label: 'Custom Orders', to: '/custom-orders' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];
