import { useController } from 'react-hook-form';

import { Input } from './styles';
import { DatePickerProps } from './types';

export const DatePicker = ({ label, ...props }: DatePickerProps) => {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <Input
      type="date"
      {...field}
      placeholder="Selecione data"
      label={label}
      error={!!error}
      helperText={error ? error.message : null}
    />
  );
};
