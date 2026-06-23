import { useState, useEffect } from 'react';
import { BRAND } from '../lib/site.js';

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const f = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProg(h > 0 ? (window.scrollY / h) * 100 : 0);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', f, { passive: true });
    f();
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ width: prog + '%' }}></div>
      <div className="float-stack">
        <a className="float-btn wa" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i className="bi bi-whatsapp"></i></a>
        <button className={`float-btn top ${showTop ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top"><i className="bi bi-arrow-up"></i></button>
      </div>
    </>
  );
}
