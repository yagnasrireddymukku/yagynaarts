import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS, byId } from '../data/catalog.js';

const read = (k) => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };

const FREE_SHIP_OVER = 1499;
const SHIP_FEE = 79;
const COUPONS = {
  WELCOME10: { type: 'pct', value: 10, label: '10% off your order' },
  RESIN15:   { type: 'pct', value: 15, label: '15% off your order' },
  FREESHIP:  { type: 'ship', value: 0, label: 'Free shipping' },
  GIFT200:   { type: 'flat', value: 200, label: '₹200 off' },
};

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => read('yagyna_cart'));
  const [wishlist, setWishlist] = useState(() => read('yagyna_wishlist'));
  const [couponCode, setCouponCode] = useState(() => localStorage.getItem('yagyna_coupon') || '');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => { localStorage.setItem('yagyna_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('yagyna_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    if (couponCode) localStorage.setItem('yagyna_coupon', couponCode);
    else localStorage.removeItem('yagyna_coupon');
  }, [couponCode]);

  const toast = useCallback((msg, icon = 'bi-check-circle-fill') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg, icon }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const add = useCallback((id, qty = 1) => {
    setCart((c) => {
      const line = c.find((x) => x.id === id);
      if (line) return c.map((x) => (x.id === id ? { ...x, qty: x.qty + qty } : x));
      return [...c, { id, qty }];
    });
    const p = byId(id);
    toast(`Added “${p ? p.name : 'item'}” to cart`);
    setDrawerOpen(true);
  }, [toast]);

  const setQty = useCallback((id, qty) => {
    setCart((c) => c.map((x) => (x.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  }, []);
  const remove = useCallback((id) => setCart((c) => c.filter((x) => x.id !== id)), []);
  const clearCart = useCallback(() => { setCart([]); setCouponCode(''); }, []);

  const toggleWish = useCallback((id) => {
    setWishlist((w) => {
      if (w.includes(id)) { toast('Removed from wishlist', 'bi-heart'); return w.filter((x) => x !== id); }
      toast('Saved to wishlist ♥', 'bi-heart-fill'); return [...w, id];
    });
  }, [toast]);
  const inWish = useCallback((id) => wishlist.includes(id), [wishlist]);

  const applyCoupon = useCallback((code) => {
    code = (code || '').trim().toUpperCase();
    if (!COUPONS[code]) return { ok: false, msg: 'Invalid coupon code' };
    setCouponCode(code);
    return { ok: true, msg: COUPONS[code].label + ' applied!' };
  }, []);
  const clearCoupon = useCallback(() => setCouponCode(''), []);

  const count = cart.reduce((n, l) => n + l.qty, 0);
  const subtotal = cart.reduce((s, l) => { const p = byId(l.id); return s + (p ? p.price * l.qty : 0); }, 0);

  const pricing = (() => {
    const c = COUPONS[couponCode] ? { code: couponCode, ...COUPONS[couponCode] } : null;
    let discount = 0, freeShip = false;
    if (c) {
      if (c.type === 'pct') discount = Math.round(subtotal * c.value / 100);
      else if (c.type === 'flat') discount = Math.min(c.value, subtotal);
      else if (c.type === 'ship') freeShip = true;
    }
    const afterDisc = subtotal - discount;
    let shipping = 0;
    if (subtotal > 0 && afterDisc < FREE_SHIP_OVER && !freeShip) shipping = SHIP_FEE;
    return { subtotal, discount, shipping, freeShip, total: Math.max(0, afterDisc + shipping), threshold: FREE_SHIP_OVER, coupon: c };
  })();

  const value = {
    cart, wishlist, count, subtotal, pricing,
    add, setQty, remove, clearCart, toggleWish, inWish,
    applyCoupon, clearCoupon, couponCode,
    drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false),
    toast, toasts,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
