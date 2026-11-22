import { useState, useCallback } from 'react';
import { fetchJamendoTracks } from './services/jamendoApi';
import { useDebounce } from './hooks/useDebounce';
import { useFetch } from './hooks/useFetch';
import { DashboardLayout } from './components/DashboardLayout';
import { KpiCard } from './components/KpiCard';
import { FilterPanel, DEFAULT_FILTERS } from './components/FilterPanel';
import { DisplayToggle } from './components/DisplayToggle';
import { TracksTable } from './components/TracksTable';
import './App.css';

function calculateLiveKpis(tracks) {
  if (!tracks.length) {
    return [
      { id: 'total', title: 'Знайдено треків', value: '0', change: 'Змініть параметри пошуку', isPositive: false },
      { id: 'top-artist', title: 'Топ-виконавець вибірки', value: '—', change: '0 прослуховувань', isPositive: false },
      { id: 'avg-duration', title: 'Середня тривалість', value: '00:00', change: '—', isPositive: true },
    ];
  }

  const totalCount = tracks.length;

  const listensByArtist = tracks.reduce((acc, track) => {
    acc[track.artist_name] = (acc[track.artist_name] || 0) + track.listens;
    return acc;
  }, {});

  const [topArtistName, topArtistListens] = Object.entries(listensByArtist).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const totalSeconds = tracks.reduce((sum, t) => sum + t.duration, 0);
  const avgSeconds = Math.round(totalSeconds / totalCount);
  const mins = String(Math.floor(avgSeconds / 60)).padStart(2, '0');
  const secs = String(avgSeconds % 60).padStart(2, '0');

  return [
    {
      id: 'total',
      title: 'Знайдено треків',
      value: String(totalCount),
      change: 'Jamendo API v3.0',
      isPositive: true,
    },
    {
      id: 'top-artist',
      title: 'Топ-виконавець вибірки',
      value: topArtistName,
      change: `${topArtistListens.toLocaleString('uk-UA')} прослуховувань`,
      isPositive: true,
    },
    {
      id: 'avg-duration',
      title: 'Середня тривалість',
      value: `${mins}:${secs}`,
      change: `Усього ${Math.round(totalSeconds / 60)} хв музики`,
      isPositive: true,
    },
  ];
}

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const debouncedSearch = useDebounce(filters.search, 400);

  const queryParams = {
    search: debouncedSearch,
    genre: filters.genre,
    order: filters.order,
    limit: filters.limit,
  };

  const { data: tracks, loading, error, refetch } = useFetch(
    fetchJamendoTracks,
    queryParams
  );

  const handleFiltersChange = useCallback((updatedFilters) => {
    setFilters(updatedFilters);
  }, []);

  const liveKpis = calculateLiveKpis(tracks);

  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="ЛР3 · Контрольована форма фільтрів, useDebounce та useFetch"
    >
      {}
      <div className="kpi-row">
        {liveKpis.map((stat) => (
          <KpiCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
          />
        ))}
      </div>

      {}
      <FilterPanel onFiltersChange={handleFiltersChange} />

      {/* Перемикач теми попереднього перегляду */}
      <DisplayToggle />

      {}
      {loading ? (
        <section className="card state-box">
          <div className="spinner" aria-hidden="true" />
          <p>Пошук треків у Jamendo API...</p>
        </section>
      ) : error ? (
        <section className="card state-box error-box">
          <h3>Помилка завантаження даних</h3>
          <p>{error}</p>
          <button type="button" className="btn-secondary" onClick={refetch}>
            Спробувати ще раз
          </button>
        </section>
      ) : tracks.length === 0 ? (
        <section className="card state-box">
          <h3>Нічого не знайдено</h3>
          <p>За вказаними фільтрами Jamendo API не повернув жодного треку.</p>
        </section>
      ) : (
        <TracksTable tracks={tracks} />
      )}
    </DashboardLayout>
  );
}