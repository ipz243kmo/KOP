
import './Card.css';

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  as: Component = 'div',
  className = '',
  ...rest
}) {
  return (
    <Component
      className={`ds-card ds-card--${variant} ds-card--pad-${padding} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Component>
  );
}