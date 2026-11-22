
import './Button.css';

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`ds-btn ds-btn--${variant} ds-btn--${size} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}