import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/uiSlice';
import { selectFavorites } from '../store/favoritesSlice';

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
          <span className="fav-counter-badge" title="Кількість обраних треків">
            ★ Обране: {favorites.length}
          </span>

          <button
            type="button"
            className="btn-theme"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Перемкнути тему"
          >
            {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
          </button>
        </div>
      </header>

      <main className="dashboard-grid">{children}</main>
    </div>
  );
}