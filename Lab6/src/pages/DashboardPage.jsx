import { useSelector } from 'react-redux';
import { fetchJamendoTracks } from '../services/jamendoApi';
import { selectFilters } from '../store/filtersSlice';
import { selectFavorites } from '../store/favoritesSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { KpiCard, StateMessage } from '../design-system';
import { DashboardLayout } from '../components/DashboardLayout';
import { FilterPanel } from '../components/FilterPanel';
import { AnalyticsChart } from '../components/AnalyticsChart';
import { TracksTable } from '../components/TracksTable';

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
    { id: 'total', title: 'Знайдено треків', value: String(totalCount), change: 'Jamendo API v3.0', isPositive: true },
    { id: 'top-artist', title: 'Топ-виконавець вибірки', value: topArtistName, change: `${topArtistListens.toLocaleString('uk-UA')} прослуховувань`, isPositive: true },
    { id: 'avg-duration', title: 'Середня тривалість', value: `${mins}:${secs}`, change: `Усього ${Math.round(totalSeconds / 60)} хв музики`, isPositive: true },
  ];
}

export function DashboardPage() {
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);
  const debouncedSearch = useDebounce(filters.search, 400);

  const { data: fetchedTracks, loading, error, refetch } = useFetch(
    fetchJamendoTracks,
    {
      search: debouncedSearch,
      genre: filters.genre,
      order: filters.order,
      limit: filters.limit,
    }
  );

  const displayedTracks = filters.onlyFavorites ? favorites : fetchedTracks;
  const liveKpis = calculateLiveKpis(displayedTracks);

  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="ЛР6 · Власна дизайн-система, Atomic Design та Storybook"
    >
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

      <FilterPanel />

      {!filters.onlyFavorites && loading ? (
        <StateMessage type="loading" description="Пошук треків у Jamendo API..." />
      ) : !filters.onlyFavorites && error ? (
        <StateMessage
          type="error"
          title="Помилка завантаження даних"
          description={error}
          actionLabel="Спробувати ще раз"
          onAction={refetch}
        />
      ) : displayedTracks.length === 0 ? (
        <StateMessage
          type="empty"
          title={filters.onlyFavorites ? 'Список обраних треків порожній' : 'Нічого не знайдено'}
          description={
            filters.onlyFavorites
              ? 'Натисніть зірочку ☆ біля будь-якого треку, щоб додати його до обраного.'
              : 'За вказаними фільтрами Jamendo API не повернув жодного треку.'
          }
        />
      ) : (
        <>
          <AnalyticsChart tracks={displayedTracks} />
          <TracksTable tracks={displayedTracks} />
        </>
      )}
    </DashboardLayout>
  );
}