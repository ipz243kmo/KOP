const BASE_URL = 'https://api.jamendo.com/v3.0/tracks/';
const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID || '0df6e02f';

export async function fetchJamendoTracks(
  { search = '', genre = '', order = 'popularity_total', limit = 15 } = {},
  signal
) {
  const queryParts = [
    `client_id=${CLIENT_ID}`,
    'format=json',
    `limit=${limit}`,
    'include=musicinfo',
    'include=stats',
    `order=${encodeURIComponent(order)}`,
  ];

  if (search.trim()) {
    queryParts.push(`namesearch=${encodeURIComponent(search.trim())}`);
  }

  if (genre) {
    queryParts.push(`tags=${encodeURIComponent(genre)}`);
  }

  const url = `${BASE_URL}?${queryParts.join('&')}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Помилка HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (data.headers?.status !== 'success') {
    throw new Error(data.headers?.error_message || 'Не вдалося отримати дані від Jamendo API');
  }

  return (data.results || []).map((track) => ({
    id: track.id,
    name: track.name,
    artist_name: track.artist_name,
    album_name: track.album_name || 'Сингл',
    duration: Number(track.duration) || 0,
    genre: track.musicinfo?.tags?.genres?.[0] || genre || 'Інше',
    listens: Number(track.stats?.rate_listens_total) || Number(track.position) || 0,
    releasedate: track.releasedate || '—',
  }));
}

export async function fetchJamendoTrackById(id, signal) {
  if (!id) return null;

  const url = `${BASE_URL}?client_id=${CLIENT_ID}&format=json&id=${encodeURIComponent(id)}&include=musicinfo&include=stats&include=licenses`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Помилка HTTP: ${response.status}`);
  }

  const data = await response.json();

  if (data.headers?.status !== 'success') {
    throw new Error(data.headers?.error_message || 'Помилка отримання деталей треку');
  }

  const track = data.results?.[0];
  if (!track) {
    return null; 
  }

  return {
    id: track.id,
    name: track.name,
    artist_name: track.artist_name,
    artist_id: track.artist_id,
    album_name: track.album_name || 'Сингл',
    image: track.album_image || track.image || '',
    audio: track.audio || '',
    shareurl: track.shareurl || '',
    license_ccurl: track.license_ccurl || '',
    duration: Number(track.duration) || 0,
    releasedate: track.releasedate || '—',
    listens: Number(track.stats?.rate_listens_total) || 0,
    downloads: Number(track.stats?.rate_downloads_total) || 0,
    favorites: Number(track.stats?.favorited) || 0,
    genres: track.musicinfo?.tags?.genres || [],
    instruments: track.musicinfo?.tags?.instruments || [],
    moods: track.musicinfo?.tags?.vartags || [],
    vocalType: track.musicinfo?.vocalinstrumental || 'не вказано',
    tempo: track.musicinfo?.speed || 'не вказано',
  };
}