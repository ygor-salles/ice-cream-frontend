import { Control } from 'react-hook-form';

export interface InputFileProps {
  name: string;
  label: string;
  isMobile: boolean;
  control: Control<any>;
  disabled?: boolean;
  pathApi?: string;
}
