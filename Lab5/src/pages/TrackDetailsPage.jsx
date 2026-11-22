import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJamendoTrackById } from '../services/jamendoApi';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { useFetch } from '../hooks/useFetch';
import { DashboardLayout } from '../components/DashboardLayout';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function TrackDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);

  const { data: track, loading, error, refetch } = useFetch(
    fetchJamendoTrackById,
    id
  );

  const isFav = track ? favoriteIds.includes(track.id) : false;

  const handleToggleFavorite = () => {
    if (!track) return;
    dispatch(
      toggleFavorite({
        id: track.id,
        name: track.name,
        artist_name: track.artist_name,
        album_name: track.album_name,
        duration: track.duration,
        genre: track.genres?.[0] || 'Інше',
        listens: track.listens,
        releasedate: track.releasedate,
      })
    );
  };

  return (
    <DashboardLayout
      title="Jamendo Music Analytics"
      subtitle={`Детальна інформація про трек #${id}`}
    >
      <div className="back-nav details-top-bar">
        <Link to="/" className="btn-back">
          ← Назад до дашборду
        </Link>

        {track && (
          <button
            type="button"
            className={`btn-fav-detail ${isFav ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFav ? '★ В обраному' : '☆ Додати в обране'}
          </button>
        )}
      </div>

      {loading ? (
        <section className="card state-box">
          <div className="spinner" aria-hidden="true" />
          <p>Завантаження інформації про трек...</p>
        </section>
      ) : error ? (
        <section className="card state-box error-box">
          <h3>Помилка завантаження</h3>
          <p>{error}</p>
          <button type="button" className="btn-secondary" onClick={refetch}>
            Спробувати ще раз
          </button>
        </section>
      ) : !track ? (
        <section className="card state-box">
          <h3>Трек із ID «{id}» не знайдено</h3>
          <p>Можливо, трек був видалений або вказано некоректний ідентифікатор у URL.</p>
          <Link to="/" className="btn-secondary">
            Повернутися до списку треків
          </Link>
        </section>
      ) : (
        <article className="card details-card">
          <div className="details-hero">
            {track.image ? (
              <img
                src={track.image}
                alt={`Обкладинка ${track.name}`}
                className="track-cover"
              />
            ) : (
              <div className="track-cover-placeholder">🎵</div>
            )}

            <div className="details-main-info">
              <span className="badge">ID: {track.id}</span>
              <h2>{track.name}</h2>
              <p className="details-artist">
                Виконавець: <strong>{track.artist_name}</strong> · Альбом:{' '}
                <strong>{track.album_name}</strong>
              </p>

              {track.audio && (
                <div className="audio-player-box">
                  <audio controls src={track.audio} className="audio-player">
                    Ваш браузер не підтримує аудіоплеєр.
                  </audio>
                </div>
              )}
            </div>
          </div>

          <div className="details-stats-grid">
            <div className="stat-pill">
              <span>Прослуховувань</span>
              <strong>{track.listens.toLocaleString('uk-UA')}</strong>
            </div>
            <div className="stat-pill">
              <span>Завантажень</span>
              <strong>{track.downloads.toLocaleString('uk-UA')}</strong>
            </div>
            <div className="stat-pill">
              <span>У вибраному</span>
              <strong>{track.favorites.toLocaleString('uk-UA')}</strong>
            </div>
            <div className="stat-pill">
              <span>Тривалість</span>
              <strong>{formatDuration(track.duration)}</strong>
            </div>
            <div className="stat-pill">
              <span>Дата релізу</span>
              <strong>{track.releasedate}</strong>
            </div>
          </div>

          <div className="details-meta-section">
            <h4>Музичні характеристики та теги</h4>
            <ul className="meta-list">
              <li>
                <strong>Тип виконання:</strong> {track.vocalType}
              </li>
              <li>
                <strong>Темп:</strong> {track.tempo}
              </li>
              <li>
                <strong>Жанри:</strong>{' '}
                {track.genres.length > 0 ? track.genres.join(', ') : 'не вказано'}
              </li>
              <li>
                <strong>Інструменти:</strong>{' '}
                {track.instruments.length > 0
                  ? track.instruments.join(', ')
                  : 'не вказано'}
              </li>
              <li>
                <strong>Настрій (теги):</strong>{' '}
                {track.moods.length > 0 ? track.moods.join(', ') : 'не вказано'}
              </li>
            </ul>

            <div className="external-links">
              {track.license_ccurl && (
                <a
                  href={track.license_ccurl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  Ліцензія Creative Commons ↗
                </a>
              )}
              {track.shareurl && (
                <a
                  href={track.shareurl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  Відкрити на Jamendo ↗
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    </DashboardLayout>
  );
}