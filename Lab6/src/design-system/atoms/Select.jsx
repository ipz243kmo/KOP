
import './Select.css';

export function Select({ options = [], className = '', ...rest }) {
  return (
    <select className={`ds-select ${className}`.trim()} {...rest}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}