import { InputProps } from '@mui/material';
import { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { StyledTextField } from './styles';

interface TextFieldPropsApp {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal';
  InputProps?: Partial<InputProps>;
  disabled?: boolean;
  mask?: string;
  focus?: boolean;
}

export default function TextFieldApp({
  name,
  control,
  label,
  type,
  required,
  inputMode,
  InputProps,
  disabled,
  mask,
  focus,
}: TextFieldPropsApp): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null!);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) =>
        mask ? (
          <InputMask
            mask={mask}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            maskChar=" "
            value={value || ''}
            onChange={onChange}
            required={required}
            disabled={disabled}
            autoFocus={focus || true}
          >
            {() => (
              <StyledTextField
                value={value || ''}
                onChange={onChange}
                required={required}
                disabled={disabled}
                autoFocus={focus || true}
                inputRef={inputRef}
                variant="standard"
                label={label}
                error={!!error}
                helperText={error ? error.message : null}
                fullWidth
              />
            )}
          </InputMask>
        ) : (
          <StyledTextField
            label={label}
            value={value || ''}
            onChange={onChange}
            InputProps={InputProps}
            variant="standard"
            type={type}
            inputMode={inputMode}
            error={!!error}
            helperText={error ? error.message : null}
            required={required}
            fullWidth
            autoFocus
            disabled={disabled}
          />
        )
      }
    />
  );
}
