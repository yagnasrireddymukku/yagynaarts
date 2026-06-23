import { Link } from 'react-router-dom';

export default function Placeholder({ title = 'Coming soon' }) {
  return (
    <section className="section-tight bg-tint">
      <div className="container-xl mx-auto px-3 text-center" style={{ padding: '4rem 0' }}>
        <span className="eyebrow">React Port</span>
        <h1>{title}</h1>
        <p className="mx-auto" style={{ maxWidth: 480 }}>This page is being ported to React. The full static version is already built and live.</p>
        <Link className="btn btn-primary-grad" to="/"><i className="bi bi-house"></i> Back to Home</Link>
      </div>
    </section>
  );
}
