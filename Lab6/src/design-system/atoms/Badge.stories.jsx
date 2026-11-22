import { Badge } from './Badge';

export default {
  title: 'Design System/Atoms/Badge',
  component: Badge,
  argTypes: {
    variant: { control: 'select', options: ['info', 'warning', 'danger'] },
  },
};

export const Info = { args: { children: 'Electronic', variant: 'info' } };
export const Warning = { args: { children: '★ Обране: 3', variant: 'warning' } };
export const Danger = { args: { children: 'Помилка API', variant: 'danger' } };