export default function Stars({ r }) {
  const full = Math.floor(r), half = r % 1 >= 0.5;
  const items = [];
  for (let i = 0; i < full; i++) items.push('bi-star-fill');
  if (half) items.push('bi-star-half');
  while (items.length < 5) items.push('bi-star');
  return <>{items.map((c, i) => <i key={i} className={`bi ${c}`}></i>)}</>;
}
