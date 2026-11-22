
import './Spinner.css';

export function Spinner({ size = 'md' }) {
  return (
    <div
      className={`ds-spinner ds-spinner--${size}`}
      role="status"
      aria-label="Завантаження"
    />
  );
}