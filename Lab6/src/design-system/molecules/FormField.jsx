
import './FormField.css';

export function FormField({ id, label, error, children }) {
  return (
    <div className="ds-form-field">
      {label && (
        <label htmlFor={id} className="ds-form-field__label">
          {label}
        </label>
      )}
      {children}
      {error && <span className="ds-form-field__error">{error}</span>}
    </div>
  );
}