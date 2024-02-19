/* eslint-disable @typescript-eslint/no-explicit-any */
import { FocusEventHandler, ReactNode, SyntheticEvent } from 'react';
import { Control } from 'react-hook-form';

export interface SelectMultipleProps {
  name: string;
  control: Control<any>;
  options: any[];
  label: ReactNode;
  required?: boolean;
  disabled?: boolean;
  sortAlphabeticallyObject?: boolean;
  sortAlphabeticallyString?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: SyntheticEvent<Element, Event>) => void;
}
