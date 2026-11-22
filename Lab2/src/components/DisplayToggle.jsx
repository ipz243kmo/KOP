import { useState } from 'react';

export function DisplayToggle() {
  const [isDarkPreview, setIsDarkPreview] = useState(false);

  const handleToggle = () => {
    setIsDarkPreview((prev) => !prev);
  };

  return (
    <section className={`card widget-card ${isDarkPreview ? 'dark-section' : ''}`}>
      <div className="toggle-header">
        <h3>Режим попереднього перегляду</h3>
        <button type="button" className="btn-toggle" onClick={handleToggle}>
          {isDarkPreview ? '☀️ Світлий режим' : '🌙 Нічний режим'}
        </button>
      </div>

      {isDarkPreview ? (
        <p className="widget-desc">
          Активовано <strong>студійну темну тему</strong> для вечірнього моніторингу чартів Jamendo.
        </p>
      ) : (
        <p className="widget-desc">
          Активовано <strong>стандартну денну тему</strong> для роботи зі статистикою каталогу.
        </p>
      )}
    </section>
  );
}