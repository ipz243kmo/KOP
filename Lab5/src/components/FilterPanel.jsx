import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilters,
  updateFilters,
  toggleOnlyFavorites,
  resetFilters,
  DEFAULT_FILTERS,
} from '../store/filtersSlice';

const GENRE_OPTIONS = [
  { value: '', label: 'Усі жанри' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'classical', label: 'Classical' },
  { value: 'ambient', label: 'Ambient' },
  { value: 'hiphop', label: 'Hip-Hop' },
];

const ORDER_OPTIONS = [
  { value: 'popularity_total', label: 'За популярністю' },
  { value: 'releasedate_desc', label: 'Спочатку новіші' },
  { value: 'name', label: 'За назвою (А–Я)' },
  { value: 'duration_desc', label: 'За тривалістю' },
];

const LIMIT_OPTIONS = [10, 15, 25, 50];

export function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  const { control, watch, reset } = useForm({
    defaultValues: {
      search: filters.search,
      genre: filters.genre,
      order: filters.order,
      limit: filters.limit,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    dispatch(
      updateFilters({
        search: watchedValues.search,
        genre: watchedValues.genre,
        order: watchedValues.order,
        limit: watchedValues.limit,
      })
    );
  }, [
    watchedValues.search,
    watchedValues.genre,
    watchedValues.order,
    watchedValues.limit,
    dispatch,
  ]);

  const handleReset = () => {
    reset({
      search: DEFAULT_FILTERS.search,
      genre: DEFAULT_FILTERS.genre,
      order: DEFAULT_FILTERS.order,
      limit: DEFAULT_FILTERS.limit,
    });
    dispatch(resetFilters());
  };

  return (
    <section className="card widget-card full-width">
      <div className="filter-panel-header">
        <h3>Пошук та фільтрація каталогу</h3>

        <div className="filter-actions">
          <button
            type="button"
            className={`btn-fav-filter ${filters.onlyFavorites ? 'active' : ''}`}
            onClick={() => dispatch(toggleOnlyFavorites())}
          >
            {filters.onlyFavorites ? '★ Показано обрані' : '☆ Тільки обрані'}
          </button>

          <button type="button" className="btn-secondary" onClick={handleReset}>
            Скинути фільтри
          </button>
        </div>
      </div>

      <form className="filter-grid" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="filter-search">Пошук за назвою треку</label>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <input
                id="filter-search"
                type="text"
                placeholder="Наприклад: summer, night, piano..."
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              />
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="filter-genre">Жанр</label>
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <select
                id="filter-genre"
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              >
                {GENRE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="filter-order">Сортування вибірки</label>
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <select
                id="filter-order"
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              >
                {ORDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="filter-limit">Кількість треків</label>
          <Controller
            name="limit"
            control={control}
            render={({ field }) => (
              <select
                id="filter-limit"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                disabled={filters.onlyFavorites}
              >
                {LIMIT_OPTIONS.map((num) => (
                  <option key={num} value={num}>
                    {num} треків
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </form>
    </section>
  );
}