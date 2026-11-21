import { useState } from 'react';

export function PlaylistStepper({ initialLimit = 10, min = 1, max = 50 }) {
  const [trackLimit, setTrackLimit] = useState(initialLimit);

  const handleDecrement = () => {
    setTrackLimit((prev) => Math.max(min, prev - 1));
  };

  const handleIncrement = () => {
    setTrackLimit((prev) => Math.min(max, prev + 1));
  };

  const handleReset = () => {
    setTrackLimit(initialLimit);
  };

  return (
    <section className="card widget-card">
      <h3>Ліміт вибірки треків (API Limit)</h3>
      <p className="widget-desc">
        Кількість треків, що завантажуватиметься за один запит:
      </p>

      <div className="stepper-controls">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={trackLimit <= min}
          aria-label="Зменшити ліміт"
        >
          −
        </button>

        <span className="stepper-value">{trackLimit}</span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={trackLimit >= max}
          aria-label="Збільшити ліміт"
        >
          +
        </button>
      </div>

      <button type="button" className="btn-secondary" onClick={handleReset}>
        Скинути до {initialLimit}
      </button>
    </section>
  );
}