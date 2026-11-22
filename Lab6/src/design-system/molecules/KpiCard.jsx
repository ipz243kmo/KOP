
import { Card } from '../atoms/Card';
import './KpiCard.css';

export function KpiCard({ title, value, change, isPositive = true }) {
  return (
    <Card className="ds-kpi">
      <span className="ds-kpi__title">{title}</span>
      <strong className="ds-kpi__value">{value}</strong>
      {change && (
        <span
          className={`ds-kpi__trend ${
            isPositive ? 'ds-kpi__trend--positive' : 'ds-kpi__trend--negative'
          }`}
        >
          {change}
        </span>
      )}
    </Card>
  );
}