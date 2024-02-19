import { Control } from 'react-hook-form';

export interface ICheckboxAppProps {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}
