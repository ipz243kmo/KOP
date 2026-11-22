import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJamendoTrackById } from '../services/jamendoApi';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { useFetch } from '../hooks/useFetch';
import { Card, Badge, Button, StateMessage } from '../design-system';
import { DashboardLayout } from '../components/DashboardLayout';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function TrackDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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
      <div className="section-header">
        <Button variant="secondary" onClick={() => navigate('/')}>
          ← Назад до дашборду
        </Button>

        {track && (
          <Button
            variant={isFav ? 'warning' : 'secondary'}
            onClick={handleToggleFavorite}
          >
            {isFav ? '★ В обраному' : '☆ Додати в обране'}
          </Button>
        )}
      </div>

      {loading ? (
        <StateMessage type="loading" description="Завантаження інформації про трек..." />
      ) : error ? (
        <StateMessage
          type="error"
          title="Помилка завантаження"
          description={error}
          actionLabel="Спробувати ще раз"
          onAction={refetch}
        />
      ) : !track ? (
        <StateMessage
          type="empty"
          title={`Трек із ID «${id}» не знайдено`}
          description="Можливо, трек був видалений або вказано некоректний ідентифікатор у URL."
          actionLabel="Повернутися до списку треків"
          onAction={() => navigate('/')}
        />
      ) : (
        <Card as="article" className="details-card">
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
              <Badge variant="info">ID: {track.id}</Badge>
              <h2>{track.name}</h2>
              <p className="details-artist">
                Виконавець: <strong>{track.artist_name}</strong> · Альбом:{' '}
                <strong>{track.album_name}</strong>
              </p>

              {track.audio && (
                <audio controls src={track.audio} className="audio-player">
                  Ваш браузер не підтримує аудіоплеєр.
                </audio>
              )}
            </div>
          </div>

          <div className="details-stats-grid">
            <Card variant="subtle" padding="sm" className="stat-pill">
              <span>Прослуховувань</span>
              <strong>{track.listens.toLocaleString('uk-UA')}</strong>
            </Card>
            <Card variant="subtle" padding="sm" className="stat-pill">
              <span>Завантажень</span>
              <strong>{track.downloads.toLocaleString('uk-UA')}</strong>
            </Card>
            <Card variant="subtle" padding="sm" className="stat-pill">
              <span>У вибраному</span>
              <strong>{track.favorites.toLocaleString('uk-UA')}</strong>
            </Card>
            <Card variant="subtle" padding="sm" className="stat-pill">
              <span>Тривалість</span>
              <strong>{formatDuration(track.duration)}</strong>
            </Card>
            <Card variant="subtle" padding="sm" className="stat-pill">
              <span>Дата релізу</span>
              <strong>{track.releasedate}</strong>
            </Card>
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
                {track.instruments.length > 0 ? track.instruments.join(', ') : 'не вказано'}
              </li>
              <li>
                <strong>Настрій (теги):</strong>{' '}
                {track.moods.length > 0 ? track.moods.join(', ') : 'не вказано'}
              </li>
            </ul>

            <div className="button-group">
              {track.license_ccurl && (
                <a
                  href={track.license_ccurl}
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn--secondary ds-btn--md"
                >
                  Ліцензія Creative Commons ↗
                </a>
              )}
              {track.shareurl && (
                <a
                  href={track.shareurl}
                  target="_blank"
                  rel="noreferrer"
                  className="ds-btn ds-btn--secondary ds-btn--md"
                >
                  Відкрити на Jamendo ↗
                </a>
              )}
            </div>
          </div>
        </Card>
      )}
    </DashboardLayout>
  );
}