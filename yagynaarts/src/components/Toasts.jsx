import { useCart } from '../context/CartContext.jsx';

export default function Toasts() {
  const { toasts } = useCart();
  if (!toasts.length) return null;
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div className="toast" key={t.id}><i className={`bi ${t.icon}`}></i> <span>{t.msg}</span></div>
      ))}
    </div>
  );
}
