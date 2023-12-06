import { UseControllerProps, useController } from 'react-hook-form';

import { Input } from './styles';

interface PropTypes extends UseControllerProps<any> {
  label: string;
  disabled?: boolean;
}

const DatePicker: React.FC<PropTypes> = ({ label, children, ...props }) => {
  const {
    field,
    fieldState: { error },
    formState,
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

export default DatePicker;
