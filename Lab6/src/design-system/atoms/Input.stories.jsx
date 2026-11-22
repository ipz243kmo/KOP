import { Input } from './Input';

export default {
  title: 'Design System/Atoms/Input',
  component: Input,
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export const Default = { args: { placeholder: 'Пошук за назвою треку...' } };
export const WithError = { args: { value: 'Некоректний запит', hasError: true } };
export const Disabled = { args: { placeholder: 'Поле заблоковане', disabled: true } };