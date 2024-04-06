import { FormGroup } from '@mui/material';
import { Controller } from 'react-hook-form';

import { StyledCheckbox, StyledLabel } from './styles';
import { ICheckboxAppProps } from './types';

export function CheckboxApp({ name, control, label, required, disabled }: ICheckboxAppProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
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
