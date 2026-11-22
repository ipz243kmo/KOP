export function KpiCard({ title, value, change, isPositive }) {
  return (
    <article className="card kpi-card">
      <span className="kpi-title">{title}</span>
      <strong className="kpi-value">{value}</strong>
      <span className={`kpi-change ${isPositive ? 'positive' : 'negative'}`}>
        {change}
      </span>
    </article>
  );
}