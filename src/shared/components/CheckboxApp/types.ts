import { Control } from 'react-hook-form';

export interface ICheckboxAppProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}
