import { Link } from 'react-router-dom';
import { BRAND, recordForm } from '../lib/site.js';
import { useCart } from '../context/CartContext.jsx';

export default function Footer() {
  const { toast } = useCart();
  const year = new Date().getFullYear();

  const onNewsletter = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    recordForm('newsletter', { email });
    e.target.reset();
    toast("🎉 You're in! Check your inbox for 10% off.");
  };

  return (
    <footer className="site-footer">
      <div className="container-xl mx-auto px-3">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <Link className="brand" to="/"><span className="logo-mark" aria-hidden="true">Y</span>
              <span>{BRAND.name}<small>Resin Art Studio</small></span></Link>
            <p className="mt-3" style={{ maxWidth: 300 }}>{BRAND.tagline}. Premium, personalized resin art handcrafted in India and shipped with love.</p>
            <div className="foot-social">
              <a href={BRAND.social.instagram} aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href={BRAND.social.facebook} aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href={BRAND.social.pinterest} aria-label="Pinterest"><i className="bi bi-pinterest"></i></a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
              <a href={BRAND.social.youtube} aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
            <div className="mt-3" style={{ fontFamily: 'var(--font-btn)', fontSize: '.82rem', color: '#8a8aa3' }}>
              Serving: <Link to="/resin-art/hyderabad">Hyderabad</Link> · <Link to="/resin-art/telangana">Telangana</Link> · <Link to="/resin-art/india">India</Link>
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/shop?cat=keychains">Resin Keychains</Link></li>
              <li><Link to="/shop?cat=name-boards">Name Boards</Link></li>
              <li><Link to="/shop?cat=coasters">Coasters</Link></li>
              <li><Link to="/custom-orders">Custom Orders</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/artist">Meet the Artist</Link></li>
              <li><Link to="/process">Our Process</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12">
            <h4>Join the Studio</h4>
            <p style={{ fontSize: '.92rem' }}>Get early access to new drops, festival collections &amp; 10% off your first order.</p>
            <form className="newsletter-form" onSubmit={onNewsletter}>
              <input className="input" type="email" placeholder="Your email address" aria-label="Email" required />
              <button className="btn btn-primary-grad" type="submit">Subscribe</button>
            </form>
            <div className="foot-pay">
              <span>UPI</span><span>VISA</span><span>Mastercard</span><span>RuPay</span><span>Razorpay</span><span>COD</span>
            </div>
          </div>
        </div>

        <div className="foot-bottom d-flex flex-wrap justify-content-between gap-2">
          <div>© {year} {BRAND.name}. All rights reserved. Handcrafted with <i className="bi bi-heart-fill text-danger"></i> in India.</div>
          <div className="d-flex gap-3 flex-wrap">
            <Link to="/faq">FAQ</Link>
            <Link to="/order-tracking">Track Order</Link>
            <Link to="/privacy-policy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/shipping-policy">Shipping</Link>
            <Link to="/refund-policy">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
