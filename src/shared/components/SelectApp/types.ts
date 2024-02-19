/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectChangeEvent } from '@mui/material';
import { Control } from 'react-hook-form';

export interface TypeDefaultOptions {
  id: number;
  name: string;
}

export interface SelectPropsApp {
  name: string;
  control: Control<any>;
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
  onChangeStateController?: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
}
