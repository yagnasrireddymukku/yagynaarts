import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { NAV } from '../lib/site.js';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header({ onSearch }) {
  const { count, wishlist, openDrawer } = useCart();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', f, { passive: true });
    f();
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar container-xl mx-auto px-3" aria-label="Primary">
        <Link className="brand" to="/">
          <span className="logo-mark" aria-hidden="true">Y</span>
          <span>Yagyna Arts<small>Resin Art Studio</small></span>
        </Link>

        <div className={`nav-backdrop ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)}></div>
        <div className={`main-nav ${navOpen ? 'open' : ''}`}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setNavOpen(false)}>{n.label}</NavLink>
          ))}
        </div>

        <div className="nav-icons">
          <button className="icon-btn" onClick={onSearch} aria-label="Search"><i className="bi bi-search"></i></button>
          <Link className="icon-btn d-none d-sm-grid" to="/wishlist" aria-label="Wishlist">
            <i className="bi bi-heart"></i><span className="count">{wishlist.length}</span>
          </Link>
          <button className="icon-btn" onClick={openDrawer} aria-label="Open cart">
            <i className="bi bi-bag"></i><span className="count">{count}</span>
          </button>
          <Link className="icon-btn d-none d-lg-grid" to={user ? '/account' : '/login'} aria-label="Account"><i className="bi bi-person"></i></Link>
          <button className="icon-btn nav-toggle" onClick={() => setNavOpen((o) => !o)} aria-label="Menu" aria-expanded={navOpen}><i className="bi bi-list"></i></button>
        </div>
      </nav>
    </header>
  );
}
