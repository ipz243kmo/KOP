import { DataTable } from './DataTable';
import { Badge } from '../atoms/Badge';

export default {
  title: 'Design System/Organisms/DataTable',
  component: DataTable,
};

export const SampleTable = {
  args: {
    getRowKey: (row) => row.id,
    columns: [
      { key: 'name', label: 'Назва', sortable: true },
      { key: 'artist', label: 'Виконавець', sortable: true },
      {
        key: 'genre',
        label: 'Жанр',
        render: (row) => <Badge variant="info">{row.genre}</Badge>,
      },
      { key: 'plays', label: 'Прослуховування', sortable: true },
    ],
    rows: [
      { id: 1, name: 'Night Drive', artist: 'SynthWave', genre: 'Electronic', plays: 14200 },
      { id: 2, name: 'Morning Coffee', artist: 'Acoustic Duo', genre: 'Jazz', plays: 8900 },
      { id: 3, name: 'Deep Space', artist: 'Ambient Lab', genre: 'Ambient', plays: 21500 },
    ],
  },
};