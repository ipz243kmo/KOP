import { KpiCard } from './KpiCard';

export default {
  title: 'Design System/Molecules/KpiCard',
  component: KpiCard,
};

export const PositiveTrend = {
  args: {
    title: 'Топ-виконавець вибірки',
    value: 'JekK',
    change: '12 450 прослуховувань',
    isPositive: true,
  },
};

export const EmptyState = {
  args: {
    title: 'Знайдено треків',
    value: '0',
    change: 'Змініть параметри пошуку',
    isPositive: false,
  },
};