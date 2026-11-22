import { useState, useEffect } from 'react';
import { fetchJamendoTracks } from './services/jamendoApi';
import { DashboardLayout } from './components/DashboardLayout';
import { KpiCard } from './components/KpiCard';
import { PlaylistStepper } from './components/PlaylistStepper';
import { DisplayToggle } from './components/DisplayToggle';
import { TracksTable } from './components/TracksTable';
import './App.css';

function calculateLiveKpis(tracks) {
  if (!tracks.length) {
    return [
      { id: 'total', title: 'Завантажено треків', value: '0', change: 'Немає даних', isPositive: false },
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
      title: 'Завантажено треків',
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
  const [tracks, setTracks] = useState([]);
  const [limit, setLimit] = useState(15);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTracks() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchJamendoTracks(limit, controller.signal);
        setTracks(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Сталася невідома помилка під час завантаження');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTracks();

    return () => controller.abort();
  }, [limit, reloadTrigger]);

  const liveKpis = calculateLiveKpis(tracks);

  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle="ЛР2 · Інтеграція з Jamendo API, стани запиту та сортування"
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
      <div className="controls-row">
        <PlaylistStepper limit={limit} onChangeLimit={setLimit} />
        <DisplayToggle />
      </div>

      {}
      {isLoading ? (
        <section className="card state-box">
          <div className="spinner" aria-hidden="true" />
          <p>Завантаження треків із Jamendo API...</p>
        </section>
      ) : error ? (
        <section className="card state-box error-box">
          <h3>Помилка завантаження даних</h3>
          <p>{error}</p>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setReloadTrigger((prev) => prev + 1)}
          >
            Спробувати ще раз
          </button>
        </section>
      ) : tracks.length === 0 ? (
        <section className="card state-box">
          <h3>Список порожній</h3>
          <p>За вашим запитом Jamendo API не повернув жодного треку.</p>
        </section>
      ) : (
        <TracksTable tracks={tracks} />
      )}
    </DashboardLayout>
  );
}