import { AutocompleteCloseReason } from '@mui/material';
import { Control } from 'react-hook-form';

export interface AutoCompleteProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  label: string;
  required?: boolean;
  disabled?: boolean;
  sortAlphabeticallyObject?: boolean;
  onClose?: (event: React.SyntheticEvent<Element, Event>, reason: AutocompleteCloseReason) => void;
}
