import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import CartDrawer from './CartDrawer.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import Toasts from './Toasts.jsx';
import FloatingButtons from './FloatingButtons.jsx';

function Loader() {
  const [hide, setHide] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHide(true), 400); return () => clearTimeout(t); }, []);
  return <div className={`page-loader ${hide ? 'hide' : ''}`} aria-hidden="true"><div className="loader-mark">Y</div></div>;
}

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  // Scroll-reveal for [data-reveal] elements on each page
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.in-view)');
    if (!els.length) return;
    const io = new IntersectionObserver((ents) => {
      ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);

  // Home + experience manage their own top spacing; other pages clear the fixed header
  const padTop = pathname === '/' || pathname === '/experience' ? 0 : 'var(--header-h)';

  return (
    <>
      <Loader />
      <Header onSearch={() => setSearchOpen(true)} />
      <main className="page-fade" style={{ paddingTop: padTop }}><Outlet /></main>
      <Footer />
      <FloatingButtons />
      <CartDrawer />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Toasts />
    </>
  );
}
