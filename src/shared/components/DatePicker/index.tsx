import { UseControllerProps, useController } from 'react-hook-form';

import { Input } from './styles';

interface PropTypes extends UseControllerProps<any> {
  label: string;
  disabled?: boolean;
}

export const DatePicker = ({ label, ...props }: PropTypes) => {
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
