import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PRODUCTS, inr, imgPath } from '../data/catalog.js';

export default function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 60); else setQ(''); }, [open]);
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const matches = term ? PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term) || (p.blurb || '').toLowerCase().includes(term)
  ).slice(0, 8) : [];

  const go = (e) => { if (e.key === 'Enter' && q.trim()) { onClose(); nav('/shop?q=' + encodeURIComponent(q.trim())); } };

  return (
    <div className={`search-overlay ${open ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="search-panel" role="dialog" aria-label="Search products">
        <div className="search-input-row">
          <i className="bi bi-search" aria-hidden="true"></i>
          <input ref={inputRef} type="search" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={go} placeholder="Search resin gifts…" aria-label="Search products" autoComplete="off" />
          <button type="button" onClick={onClose} aria-label="Close search"><i className="bi bi-x-lg"></i></button>
        </div>
        {!q && <div className="search-hint">Try <b>keychain</b>, <b>name board</b>, <b>coaster</b> or <b>jewellery</b></div>}
        <div className="search-results">
          {q && matches.length === 0 && (
            <div className="search-empty"><i className="bi bi-emoji-frown" style={{ fontSize: '1.6rem' }}></i><p className="mt-2 mb-0">No matches for “{q}”. <Link to="/shop" onClick={onClose}>Browse all products</Link></p></div>
          )}
          {matches.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`} onClick={onClose}>
              <img src={imgPath(p)} alt={p.alt} />
              <span><span className="sr-name">{p.name}</span><br /><span className="sr-cat">{p.cat}</span></span>
              <span className="sr-price">{inr(p.price)}</span>
            </Link>
          ))}
          {q && matches.length > 0 && (
            <Link to={'/shop?q=' + encodeURIComponent(q)} onClick={onClose} style={{ justifyContent: 'center', color: 'var(--c-primary)', fontFamily: 'var(--font-btn)', fontWeight: 600 }}>
              See all results for “{q}” <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
