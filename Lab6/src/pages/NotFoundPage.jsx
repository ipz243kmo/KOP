import { useNavigate } from 'react-router-dom';
import { StateMessage } from '../design-system';
import { DashboardLayout } from '../components/DashboardLayout';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="Сторінку не знайдено (404)"
    >
      <StateMessage
        type="empty"
        title="404 — Такої сторінки не існує"
        description="Перевірте правильність адреси або поверніться на головну сторінку."
        actionLabel="← На головну"
        onAction={() => navigate('/')}
      />
    </DashboardLayout>
  );
}