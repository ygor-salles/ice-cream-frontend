import { UseControllerProps } from 'react-hook-form';

export interface DatePickerProps extends UseControllerProps<any> {
  label: string;
  disabled?: boolean;
}
