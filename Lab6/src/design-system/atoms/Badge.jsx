
import './Badge.css';

export function Badge({ children, variant = 'info', className = '' }) {
  return (
    <span className={`ds-badge ds-badge--${variant} ${className}`.trim()}>
      {children}
    </span>
  );
}