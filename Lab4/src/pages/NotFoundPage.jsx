import { Link } from 'react-router-dom';
import { DashboardLayout } from '../components/DashboardLayout';

export function NotFoundPage() {
  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="Сторінку не знайдено (404)"
    >
      <section className="card state-box">
        <h2>404 — Такої сторінки не існує</h2>
        <p>Перевірте правильність адреси або поверніться на головну сторінку.</p>
        <Link to="/" className="btn-secondary">
          ← На головну
        </Link>
      </section>
    </DashboardLayout>
  );
}