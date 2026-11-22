import { useState } from 'react';

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

export function FilteredTrackList({ tracks }) {
  const [selectedGenre, setSelectedGenre] = useState('All');

  const genres = ['All', ...new Set(tracks.map((track) => track.genre))];

  const filteredTracks =
    selectedGenre === 'All'
      ? tracks
      : tracks.filter((track) => track.genre === selectedGenre);

  return (
    <section className="card widget-card full-width">
      <div className="list-header">
        <h3>Каталог треків ({filteredTracks.length})</h3>

        <label className="filter-control">
          <span>Жанр: </span>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre === 'All' ? 'Усі жанри' : genre}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredTracks.length === 0 ? (
        <p className="empty-state">Треків у цьому жанрі не знайдено.</p>
      ) : (
        <ul className="track-list">
          {filteredTracks.map((track) => (
            <li key={track.id} className="track-item">
              <div className="track-info">
                <strong>{track.name}</strong>
                <span className="track-artist">{track.artist_name}</span>
              </div>
              <div className="track-meta">
                <span className="badge">{track.genre}</span>
                <span className="duration">{formatDuration(track.duration)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}