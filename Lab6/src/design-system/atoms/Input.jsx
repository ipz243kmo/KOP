
import './Input.css';

export function Input({ hasError = false, className = '', ...rest }) {
  return (
    <input
      className={`ds-input ${hasError ? 'ds-input--error' : ''} ${className}`.trim()}
      {...rest}
    />
  );
}