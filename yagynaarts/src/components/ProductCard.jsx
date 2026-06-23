import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { inr, discount, imgPath } from '../data/catalog.js';
import Stars from './Stars.jsx';

export default function ProductCard({ p }) {
  const { add, toggleWish, inWish } = useCart();
  const disc = discount(p);
  const wished = inWish(p.id);
  const badgeClass = /sale/i.test(p.badge) ? 'sale' : /new/i.test(p.badge) ? 'new' : '';

  return (
    <article className="product-card shine">
      <div className="media">
        {p.badge && <span className={`badge-pill ${badgeClass}`}>{p.badge}</span>}
        <div className="card-actions">
          <button className={`card-action ${wished ? 'active' : ''}`} onClick={() => toggleWish(p.id)} aria-label={`Add ${p.name} to wishlist`}>
            <i className={`bi ${wished ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          <Link className="card-action" to={`/product/${p.id}`} aria-label={`View ${p.name}`}><i className="bi bi-eye"></i></Link>
        </div>
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <picture>
            <source srcSet={imgPath(p, 'webp')} type="image/webp" />
            <img src={imgPath(p, 'jpg')} alt={p.alt} loading="lazy" width="440" height="330" />
          </picture>
        </Link>
      </div>
      <div className="body">
        <div className="cat">{p.cat}</div>
        <h3 className="title"><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
        <div className="stars"><Stars r={p.rating} /> <span>({p.reviews})</span></div>
        <div className="price-row">
          <span className="price">{inr(p.price)}</span>
          {p.mrp > p.price && <span className="price-old">{inr(p.mrp)}</span>}
          {disc > 0 && <span className="badge-pill sale" style={{ position: 'static' }}>-{disc}%</span>}
        </div>
        <button className="add-cart" onClick={() => add(p.id, 1)}><i className="bi bi-bag-plus"></i> Add to Cart</button>
      </div>
    </article>
  );
}
