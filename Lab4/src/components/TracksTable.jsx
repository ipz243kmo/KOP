import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function TracksTable({ tracks }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const sortedTracks = sortConfig.key
    ? [...tracks].sort((a, b) => {
        const { key, direction } = sortConfig;
        const multiplier = direction === 'asc' ? 1 : -1;

        if (typeof a[key] === 'string') {
          return a[key].localeCompare(b[key]) * multiplier;
        }
        return (a[key] - b[key]) * multiplier;
      })
    : tracks;

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return ' ↕';
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <section className="card widget-card full-width">
      <div className="list-header">
        <h3>Знайдені треки ({sortedTracks.length})</h3>
        <span className="hint-text">Натисніть на трек для перегляду деталей та прослуховування</span>
      </div>

      <div className="table-wrapper">
        <table className="tracks-table">
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => handleSort('name')}
                >
                  Назва треку{getSortIndicator('name')}
                </button>
              </th>
              <th>Виконавець</th>
              <th>Жанр</th>
              <th>
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => handleSort('duration')}
                >
                  Тривалість{getSortIndicator('duration')}
                </button>
              </th>
              <th>
                <button
                  type="button"
                  className="sort-btn"
                  onClick={() => handleSort('listens')}
                >
                  Прослуховування{getSortIndicator('listens')}
                </button>
              </th>
              <th>Реліз</th>
            </tr>
          </thead>
          <tbody>
            {sortedTracks.map((track) => (
              <tr
                key={track.id}
                className="clickable-row"
                onClick={() => navigate(`/track/${track.id}`)}
              >
                <td>
                  <Link
                    to={`/track/${track.id}`}
                    className="track-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <strong>{track.name}</strong>
                  </Link>
                  <div className="album-sub">{track.album_name}</div>
                </td>
                <td>{track.artist_name}</td>
                <td>
                  <span className="badge">{track.genre}</span>
                </td>
                <td className="num-cell">{formatDuration(track.duration)}</td>
                <td className="num-cell">
                  {track.listens.toLocaleString('uk-UA')}
                </td>
                <td className="num-cell">{track.releasedate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}