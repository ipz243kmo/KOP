import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFavoriteIds, toggleFavorite } from '../store/favoritesSlice';
import { Card, Badge, Button, DataTable } from '../design-system';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function TracksTable({ tracks }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favoriteIds = useSelector(selectFavoriteIds);

  const columns = [
    {
      key: 'favorite',
      label: 'Обране',
      width: '56px',
      render: (track) => {
        const isFav = favoriteIds.includes(track.id);
        return (
          <Button
            variant="ghost"
            className={`star-btn ${isFav ? 'star-btn--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(toggleFavorite(track));
            }}
            title={isFav ? 'Видалити з обраного' : 'Додати в обране'}
          >
            {isFav ? '★' : '☆'}
          </Button>
        );
      },
    },
    {
      key: 'name',
      label: 'Назва треку',
      sortable: true,
      render: (track) => (
        <>
          <Link
            to={`/track/${track.id}`}
            className="track-link"
            onClick={(e) => e.stopPropagation()}
          >
            <strong>{track.name}</strong>
          </Link>
          <div className="album-sub">{track.album_name}</div>
        </>
      ),
    },
    { key: 'artist_name', label: 'Виконавець' },
    {
      key: 'genre',
      label: 'Жанр',
      render: (track) => <Badge variant="info">{track.genre}</Badge>,
    },
    {
      key: 'duration',
      label: 'Тривалість',
      sortable: true,
      cellClassName: 'num-cell',
      render: (track) => formatDuration(track.duration),
    },
    {
      key: 'listens',
      label: 'Прослуховування',
      sortable: true,
      cellClassName: 'num-cell',
      render: (track) => track.listens.toLocaleString('uk-UA'),
    },
    {
      key: 'releasedate',
      label: 'Реліз',
      cellClassName: 'num-cell',
    },
  ];

  return (
    <Card as="section">
      <div className="section-header">
        <h3>Знайдені треки ({tracks.length})</h3>
        <span className="hint-text">
          Натисніть ★ для збереження в обране або клікніть на рядок для деталей
        </span>
      </div>

      <DataTable
        columns={columns}
        rows={tracks}
        getRowKey={(track) => track.id}
        onRowClick={(track) => navigate(`/track/${track.id}`)}
      />
    </Card>
  );
}