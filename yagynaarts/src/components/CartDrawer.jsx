import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { byId, inr, imgPath } from '../data/catalog.js';

export default function CartDrawer() {
  const { cart, drawerOpen, closeDrawer, setQty, remove, pricing, count } = useCart();
  return (
    <>
      <div className={`drawer-backdrop ${drawerOpen ? 'show' : ''}`} onClick={closeDrawer}></div>
      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cd-head">
          <h3>Your Cart ({count})</h3>
          <button className="icon-btn" onClick={closeDrawer} aria-label="Close cart"><i className="bi bi-x-lg"></i></button>
        </div>
        <div className="cd-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <i className="bi bi-bag" style={{ fontSize: '2.4rem' }}></i>
              <p className="mt-2">Your cart is empty.</p>
              <Link className="btn btn-ghost" to="/shop" onClick={closeDrawer}>Start shopping</Link>
            </div>
          ) : cart.map((l) => {
            const p = byId(l.id); if (!p) return null;
            return (
              <div className="cart-line" key={l.id}>
                <img src={imgPath(p)} alt={p.alt} />
                <div className="cl-info">
                  <b>{p.name}</b>
                  <div style={{ fontSize: '.85rem', color: 'var(--c-muted)' }}>{inr(p.price)}</div>
                  <div className="qty">
                    <button onClick={() => setQty(p.id, l.qty - 1)} aria-label="Decrease">−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(p.id, l.qty + 1)} aria-label="Increase">+</button>
                    <button onClick={() => remove(p.id)} aria-label="Remove" style={{ marginLeft: 'auto', border: 0, background: 'none', color: 'var(--c-muted)', cursor: 'pointer' }}><i className="bi bi-trash"></i></button>
                  </div>
                </div>
                <b style={{ fontFamily: 'var(--font-btn)' }}>{inr(p.price * l.qty)}</b>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="cd-foot">
            <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><b>{inr(pricing.subtotal)}</b></div>
            <p style={{ fontSize: '.8rem', color: 'var(--c-muted)' }}>Shipping &amp; taxes calculated at checkout.</p>
            <Link className="btn btn-primary-grad w-100 justify-content-center mb-2" to="/checkout" onClick={closeDrawer}>Checkout</Link>
            <Link className="btn btn-ghost w-100 justify-content-center" to="/cart" onClick={closeDrawer}>View Cart</Link>
          </div>
        )}
      </aside>
    </>
  );
}
