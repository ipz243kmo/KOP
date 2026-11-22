import { Select } from './Select';

export default {
  title: 'Design System/Atoms/Select',
  component: Select,
};

export const Default = {
  args: {
    options: [
      { value: '', label: 'Усі жанри' },
      { value: 'electronic', label: 'Electronic' },
      { value: 'rock', label: 'Rock' },
      { value: 'jazz', label: 'Jazz' },
    ],
  },
};