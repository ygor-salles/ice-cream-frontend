import { FormGroup } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

import { StyledCheckbox, StyledLabel } from './styles';

interface ICheckboxAppProps {
  name: string;
  control: Control<any>;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

export default function CheckboxApp({
  name,
  control,
  label,
  required,
  disabled,
}: ICheckboxAppProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormGroup>
          <StyledLabel
            control={
              <StyledCheckbox
                onChange={onChange}
                checked={value}
                required={required}
                disabled={disabled}
              />
            }
            label={label}
          />
        </FormGroup>
      )}
    />
  );
}
