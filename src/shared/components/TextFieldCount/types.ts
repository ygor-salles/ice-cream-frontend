import { Control } from 'react-hook-form';

export type TypeEventFieldCount = 'add' | 'subt' | 'onChange';

export interface TextFieldCountProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  defaultValue: string;
  disabled?: boolean;
  valueCurrent: string;
  handleOperation: (onClick: TypeEventFieldCount) => void;
}
