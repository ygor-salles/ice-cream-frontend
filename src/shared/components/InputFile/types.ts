import { Control } from 'react-hook-form';

export interface InputFileProps {
  name: string;
  label: string;
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  disabled?: boolean;
  pathApi?: string;
}
