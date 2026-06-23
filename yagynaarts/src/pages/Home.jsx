import { Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, COLLECTIONS, collImg, imgPath } from '../data/catalog.js';
import ProductCard from '../components/ProductCard.jsx';

const best = PRODUCTS.filter((p) => p.tags.includes('bestseller')).slice(0, 4);
const fresh = PRODUCTS.filter((p) => p.tags.includes('new')).slice(0, 4);
const featured = COLLECTIONS.slice(0, 4);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-orbs" aria-hidden="true"><span className="orb o1"></span><span className="orb o2"></span><span className="orb o3"></span></div>
        <div className="container-xl mx-auto px-3">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 hero-content">
              <span className="eyebrow" data-reveal="up">Handcrafted in India · Made to Order</span>
              <h1 data-reveal="up" data-delay="1">Resin Art That Holds Your<br /><span className="text-shimmer">Most Precious Memories</span></h1>
              <p className="lead" data-reveal="up" data-delay="2">From personalized name boards to photo keychains and ocean-inspired wall art — every Yagyna Arts piece is hand-poured, one of a kind, and made with love.</p>
              <div className="hero-cta" data-reveal="up" data-delay="3">
                <Link className="btn btn-primary-grad magnetic" to="/shop"><i className="bi bi-bag-heart"></i> Shop the Collection</Link>
                <Link className="btn btn-ghost" to="/custom-orders"><i className="bi bi-brush"></i> Customize Your Own</Link>
              </div>
              <div className="hero-trust" data-reveal="up" data-delay="4">
                <div className="ht"><b>12,000+</b><span>Happy Customers</span></div>
                <div className="ht"><b>4.9</b><span>Average Rating</span></div>
                <div className="ht"><b>100%</b><span>Handmade</span></div>
              </div>
            </div>
            <div className="col-lg-6 hero-visual" data-reveal="left">
              <div className="hero-frame tilt">
                <picture><source srcSet="assets/images/hero-resin-art.webp" type="image/webp" />
                  <img src="assets/images/hero-resin-art.jpg" alt="Handcrafted ocean-themed resin wall art by Yagyna Arts" width="720" height="560" /></picture>
              </div>
              <div className="hero-chip c1 anim-float"><i className="bi bi-patch-check-fill"></i> 100% Handmade</div>
              <div className="hero-chip c2 anim-float2"><i className="bi bi-truck"></i> Fast Pan-India Shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {['Personalized Gifts', 'Wedding Keepsakes', 'Festival Collection', 'Custom Name Boards', 'Photo Jewelry', 'Corporate Gifting',
            'Personalized Gifts', 'Wedding Keepsakes', 'Festival Collection', 'Custom Name Boards', 'Photo Jewelry', 'Corporate Gifting'].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* FEATURED COLLECTIONS */}
      <section className="section bg-tint">
        <div className="container-xl mx-auto px-3">
          <div className="section-head" data-reveal="up">
            <span className="eyebrow">Curated For Every Occasion</span>
            <h2>Featured Collections</h2>
            <p>Thoughtfully grouped so you can find the perfect handcrafted gift in seconds.</p>
          </div>
          <div className="row g-4">
            {featured.map((c, i) => (
              <div className="col-6 col-lg-3" key={c.slug} data-reveal="up" data-delay={(i % 4) + 1}>
                <Link className="coll-card" to={`/shop?cat=${c.cat}`} aria-label={`${c.name} collection`}>
                  <picture><source srcSet={collImg(c, 'webp')} type="image/webp" /><img src={collImg(c, 'jpg')} alt={`${c.name} resin collection`} loading="lazy" /></picture>
                  <div className="cc-body"><h3>{c.name}</h3><p>{c.desc}</p><span className="cc-link">Shop now <i className="bi bi-arrow-right"></i></span></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="section">
        <div className="container-xl mx-auto px-3">
          <div className="section-head" data-reveal="up"><span className="eyebrow">Browse The Studio</span><h2>Shop by Category</h2></div>
          <div className="cat-grid" data-reveal="up">
            {CATEGORIES.map((c) => (
              <Link className="cat-chip" to={`/shop?cat=${c.slug}`} key={c.slug}>
                <span className="ci"><i className={`bi ${c.icon}`}></i></span><span>{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section bg-soft">
        <div className="container-xl mx-auto px-3">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4" data-reveal="up">
            <div className="section-head left mb-0"><span className="eyebrow">Loved By Thousands</span><h2>Bestselling Resin Gifts</h2></div>
            <Link className="btn btn-ghost" to="/shop">View All <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="row g-4" data-reveal="up">
            {best.map((p) => <div className="col-6 col-md-4 col-lg-3" key={p.id}><ProductCard p={p} /></div>)}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section bg-tint">
        <div className="container-xl mx-auto px-3">
          <div className="section-head" data-reveal="up"><span className="eyebrow">The Yagyna Promise</span><h2>Why Choose Us</h2><p>We treat every order like a gift to someone we love — because to you, it is.</p></div>
          <div className="row g-4">
            {[['bi-hand-thumbs-up', 'Truly Handmade', 'Every piece is hand-poured and finished by our artisans — no two are ever alike.'],
              ['bi-palette', 'Fully Personalized', 'Add names, photos, colours & messages. We craft it exactly the way you imagine.'],
              ['bi-droplet-half', 'Premium Materials', 'Waterproof, scratch-resistant, crystal-clear epoxy that keeps its shine for years.'],
              ['bi-shield-check', 'Safe Shipping', 'Bubble-wrapped, boxed & insured — delivered safely across India, every time.']].map((f, i) => (
              <div className="col-md-6 col-lg-3" key={i} data-reveal="up" data-delay={i}>
                <div className="glass-card h-100"><div className="feature-icon"><i className={`bi ${f[0]}`}></i></div><h3>{f[1]}</h3><p>{f[2]}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section bg-soft">
        <div className="container-xl mx-auto px-3">
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4" data-reveal="up">
            <div className="section-head left mb-0"><span className="eyebrow">Fresh From The Studio</span><h2>New Arrivals</h2></div>
            <Link className="btn btn-ghost" to="/shop?sort=new">View All <i className="bi bi-arrow-right"></i></Link>
          </div>
          <div className="row g-4" data-reveal="up">
            {fresh.map((p) => <div className="col-6 col-md-4 col-lg-3" key={p.id}><ProductCard p={p} /></div>)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-tint">
        <div className="container-xl mx-auto px-3">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5" data-reveal="right">
              <span className="eyebrow">From Pour To Doorstep</span><h2>How Your Gift Is Made</h2>
              <p>Handcrafting resin is slow, patient work — and that's exactly why it feels so special. Here's the journey every Yagyna Arts piece takes.</p>
              <Link className="btn btn-dark mt-2" to="/about">See How We Work <i className="bi bi-arrow-right"></i></Link>
            </div>
            <div className="col-lg-7" data-reveal="left">
              <div className="timeline">
                {[['1', 'You Personalize', 'Choose your design, share names, photos and colour preferences.'],
                  ['2', 'We Hand-Pour', 'Our artisans mix, tint and pour premium epoxy resin layer by layer.'],
                  ['3', 'Cure & Finish', 'Each piece cures for 24–72 hours, then is sanded and polished to a glass shine.'],
                  ['4', 'Safe Delivery', 'We pack it with care and ship it to your door anywhere in India.']].map((s) => (
                  <div className="tl-item" key={s[0]}><span className="tl-num">{s[0]}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="section-tight bg-dark">
        <div className="container-xl mx-auto px-3">
          <div className="row g-4">
            {[['12,000+', 'Orders Delivered'], ['4.9', 'Average Rating'], ['500+', 'Custom Designs'], ['28', 'States Shipped']].map((s, i) => (
              <div className="col-6 col-md-3 stat" key={i} data-reveal="up" data-delay={i}><b className="text-grad">{s[0]}</b><span>{s[1]}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section bg-soft">
        <div className="container-xl mx-auto px-3">
          <div className="section-head" data-reveal="up"><span className="eyebrow">Real Words, Real Customers</span><h2>Loved Across India</h2></div>
          <div className="row g-4">
            {[['A', 'Ananya R.', 'Hyderabad', 'The name board for our wedding was even more beautiful than the photos. Everyone asked where we got it!'],
              ['M', 'Mohit S.', 'Bengaluru', 'Ordered photo keychains for my whole team. Quality is premium and the packaging felt so luxe.'],
              ['P', 'Priya K.', 'Mumbai', 'The coasters are stunning and so sturdy. You can tell each one is genuinely handmade with love.']].map((r, i) => (
              <div className="col-md-4" key={i} data-reveal="up" data-delay={i}>
                <div className="review-card"><div className="stars">{'★★★★★'}</div><p className="quote">“{r[3]}”</p>
                  <div className="who"><span className="av">{r[0]}</span><div><b>{r[1]}</b><span>{r[2]}</span></div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE TEASER */}
      <section className="section-tight">
        <div className="container-xl mx-auto px-3">
          <Link to="/experience" className="exp-teaser shine" data-reveal="zoom" aria-label="Experience the journey">
            <div className="et-text">
              <span className="eyebrow" style={{ color: 'var(--c-accent)' }}>New · Immersive Experience</span>
              <h2>Watch a Memory Become a Masterpiece</h2>
              <p>An Apple-style scroll journey through design, the pour, the craft and the reveal.</p>
              <span className="et-cta"><i className="bi bi-play-circle"></i> Enter the Experience <i className="bi bi-arrow-right"></i></span>
            </div>
            <div className="et-media">
              <picture><source srcSet={imgPath({ img: 'ocean-waves-resin-wall-art' }, 'webp')} type="image/webp" /><img src={imgPath({ img: 'ocean-waves-resin-wall-art' }, 'jpg')} alt="Immersive resin art experience" /></picture>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-xl mx-auto px-3">
          <div className="cta-banner text-center" data-reveal="zoom">
            <div className="position-relative" style={{ zIndex: 2 }}>
              <h2>Have Something Special in Mind?</h2>
              <p className="mb-4 mx-auto" style={{ maxWidth: 560 }}>Tell us your idea — a name, a photo, a memory — and we'll handcraft a one-of-a-kind resin piece just for you.</p>
              <Link className="btn btn-gold magnetic" to="/custom-orders"><i className="bi bi-stars"></i> Start a Custom Order</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
