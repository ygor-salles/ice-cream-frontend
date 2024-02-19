import { Control } from 'react-hook-form';

export interface TextFieldAppProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal';
  disabled?: boolean;
  mask?: string;
  currency?: boolean;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
  variant?: 'outlined' | 'filled' | 'standard';
  onChangeStateController?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleSearch?: (value: string) => void;
}
