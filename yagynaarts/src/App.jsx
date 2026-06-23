import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Placeholder from './pages/Placeholder.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Placeholder title="Shop" />} />
        <Route path="/collections" element={<Placeholder title="Collections" />} />
        <Route path="/product/:id" element={<Placeholder title="Product" />} />
        <Route path="/cart" element={<Placeholder title="Cart" />} />
        <Route path="/checkout" element={<Placeholder title="Checkout" />} />
        <Route path="/custom-orders" element={<Placeholder title="Custom Orders" />} />
        <Route path="/experience" element={<Placeholder title="Experience" />} />
        <Route path="/about" element={<Placeholder title="About" />} />
        <Route path="/artist" element={<Placeholder title="Meet the Artist" />} />
        <Route path="/process" element={<Placeholder title="Our Process" />} />
        <Route path="/gallery" element={<Placeholder title="Gallery" />} />
        <Route path="/testimonials" element={<Placeholder title="Reviews" />} />
        <Route path="/blog" element={<Placeholder title="Blog" />} />
        <Route path="/blog/:id" element={<Placeholder title="Article" />} />
        <Route path="/faq" element={<Placeholder title="FAQ" />} />
        <Route path="/contact" element={<Placeholder title="Contact" />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
        <Route path="/register" element={<Placeholder title="Create Account" />} />
        <Route path="/forgot-password" element={<Placeholder title="Reset Password" />} />
        <Route path="/account" element={<Placeholder title="My Account" />} />
        <Route path="/wishlist" element={<Placeholder title="Wishlist" />} />
        <Route path="/order-tracking" element={<Placeholder title="Track Order" />} />
        <Route path="/privacy-policy" element={<Placeholder title="Privacy Policy" />} />
        <Route path="/terms" element={<Placeholder title="Terms & Conditions" />} />
        <Route path="/shipping-policy" element={<Placeholder title="Shipping Policy" />} />
        <Route path="/refund-policy" element={<Placeholder title="Refund Policy" />} />
        <Route path="/resin-art/:place" element={<Placeholder title="Resin Art" />} />
        <Route path="*" element={<Placeholder title="404 — Page Not Found" />} />
      </Route>
    </Routes>
  );
}
