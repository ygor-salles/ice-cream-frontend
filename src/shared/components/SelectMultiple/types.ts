import { FocusEventHandler, ReactNode, SyntheticEvent } from 'react';
import { Control } from 'react-hook-form';

export interface SelectMultipleProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  label: ReactNode;
  required?: boolean;
  disabled?: boolean;
  sortAlphabeticallyObject?: boolean;
  sortAlphabeticallyString?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onClose?: (event: SyntheticEvent<Element, Event>) => void;
}
