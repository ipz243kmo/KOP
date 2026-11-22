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
import { Card, Button, FormField, Input, Select } from '../design-system';

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

const LIMIT_OPTIONS = [
  { value: 10, label: '10 треків' },
  { value: 15, label: '15 треків' },
  { value: 25, label: '25 треків' },
  { value: 50, label: '50 треків' },
];

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
    <Card as="section">
      <div className="section-header">
        <h3>Пошук та фільтрація каталогу</h3>

        <div className="button-group">
          <Button
            variant={filters.onlyFavorites ? 'warning' : 'secondary'}
            onClick={() => dispatch(toggleOnlyFavorites())}
          >
            {filters.onlyFavorites ? '★ Показано обрані' : '☆ Тільки обрані'}
          </Button>

          <Button variant="secondary" onClick={handleReset}>
            Скинути фільтри
          </Button>
        </div>
      </div>

      <form className="filter-grid" onSubmit={(e) => e.preventDefault()}>
        <FormField id="filter-search" label="Пошук за назвою треку">
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                id="filter-search"
                type="text"
                placeholder="Наприклад: summer, night, piano..."
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              />
            )}
          />
        </FormField>

        <FormField id="filter-genre" label="Жанр">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                id="filter-genre"
                options={GENRE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              />
            )}
          />
        </FormField>

        <FormField id="filter-order" label="Сортування вибірки">
          <Controller
            name="order"
            control={control}
            render={({ field }) => (
              <Select
                id="filter-order"
                options={ORDER_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                disabled={filters.onlyFavorites}
              />
            )}
          />
        </FormField>

        <FormField id="filter-limit" label="Кількість треків">
          <Controller
            name="limit"
            control={control}
            render={({ field }) => (
              <Select
                id="filter-limit"
                options={LIMIT_OPTIONS}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                disabled={filters.onlyFavorites}
              />
            )}
          />
        </FormField>
      </form>
    </Card>
  );
}