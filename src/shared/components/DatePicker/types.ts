import { UseControllerProps } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DatePickerProps extends UseControllerProps<any> {
  label: string;
  disabled?: boolean;
}
