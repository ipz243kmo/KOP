import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/uiSlice';
import { selectFavorites } from '../store/favoritesSlice';
import { Button, Badge } from '../design-system';

export function DashboardLayout({ title, subtitle, children }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const favorites = useSelector(selectFavorites);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <Link to="/" className="brand-link">
            <h1>{title}</h1>
          </Link>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>

        <div className="header-actions">
          <Badge variant="warning">★ Обране: {favorites.length}</Badge>

          <Button
            variant="secondary"
            size="md"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Перемкнути тему"
          >
            {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
          </Button>
        </div>
      </header>

      <main className="dashboard-grid">{children}</main>
    </div>
  );
}