import { Control } from 'react-hook-form';

export interface TextFieldCountProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  defaultValue: number;
  disabled?: boolean;
  handleOperation: (onClick?: 'add' | 'subt' | undefined) => void;
  stateCount: number;
  setStateCount: React.Dispatch<React.SetStateAction<number>>;
}
