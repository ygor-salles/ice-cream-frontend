import { Control, Controller } from 'react-hook-form';

import { NumberFormatCustom } from '../number-format-custom/NumberFormatCustom';
import { TextMaskCustom } from '../text-mask-custom/TextMaskCustom';
import { StyledTextField } from './styles';

interface TextFieldPropsApp {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  inputMode?: 'email' | 'search' | 'tel' | 'text' | 'url' | 'none' | 'numeric' | 'decimal';
  disabled?: boolean;
  mask?: string;
  currency?: boolean;
}

export default function TextFieldApp({
  name,
  control,
  label,
  type,
  required,
  inputMode,
  disabled,
  mask,
  currency,
}: TextFieldPropsApp): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <StyledTextField
          label={label}
          value={value || ''}
          onChange={onChange}
          InputProps={
            mask
              ? { inputComponent: TextMaskCustom as any, inputProps: { mask } }
              : currency
              ? { inputComponent: NumberFormatCustom as any }
              : undefined
          }
          variant="standard"
          type={type}
          inputMode={inputMode}
          error={!!error}
          helperText={error ? error.message : null}
          required={required}
          fullWidth
          disabled={disabled}
        />
      )}
    />
  );
}
