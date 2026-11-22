import { Spinner } from './Spinner';

export default {
  title: 'Design System/Atoms/Spinner',
  component: Spinner,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export const Small = { args: { size: 'sm' } };
export const Medium = { args: { size: 'md' } };
export const Large = { args: { size: 'lg' } };