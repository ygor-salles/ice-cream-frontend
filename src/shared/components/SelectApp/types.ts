import { SelectChangeEvent } from '@mui/material';
import { Control } from 'react-hook-form';

export interface TypeDefaultOptions {
  id: number;
  name: string;
}

export interface SelectPropsApp {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any> | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  label: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  setId?: boolean;
  sortAlphabeticallyObject?: boolean;
  sortAlphabeticallyString?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  defaultValue?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: React.SyntheticEvent<Element, Event>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChangeStateController?: (event: SelectChangeEvent<any>, child: React.ReactNode) => void;
}
