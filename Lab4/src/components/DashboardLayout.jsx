import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export function DashboardLayout({ title, subtitle, children }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div>
          <Link to="/" className="brand-link">
            <h1>{title}</h1>
          </Link>
          {subtitle && <p className="subtitle">{subtitle}</p>}
        </div>

        <button
          type="button"
          className="btn-theme"
          onClick={toggleTheme}
          aria-label="Перемкнути тему"
        >
          {theme === 'light' ? '🌙 Темна тема' : '☀️ Світла тема'}
        </button>
      </header>

      <main className="dashboard-grid">{children}</main>
    </div>
  );
}