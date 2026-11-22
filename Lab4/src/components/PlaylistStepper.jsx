import { useState } from 'react';
export function PlaylistStepper({ limit, onChangeLimit, defaultLimit = 15, min = 5, max = 50 }) {
  return (
    <section className="card widget-card">
      <h3>Ліміт вибірки треків (API Limit)</h3>
      <p className="widget-desc">
        Кількість треків, що завантажується з Jamendo API:
      </p>

      <div className="stepper-controls">
        <button
          type="button"
          onClick={() => onChangeLimit(Math.max(min, limit - 5))}
          disabled={limit <= min}
          aria-label="Зменшити ліміт"
        >
          −
        </button>

        <span className="stepper-value">{limit}</span>

        <button
          type="button"
          onClick={() => onChangeLimit(Math.min(max, limit + 5))}
          disabled={limit >= max}
          aria-label="Збільшити ліміт"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="btn-secondary"
        onClick={() => onChangeLimit(defaultLimit)}
      >
        Скинути до {defaultLimit}
      </button>
    </section>
  );
}