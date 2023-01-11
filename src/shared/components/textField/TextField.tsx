import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import { NumberFormatCustom } from '../number-format-custom/NumberFormatCustom';
import { TextMaskCustom } from '../text-mask-custom/TextMaskCustom';
import { StyledTextField, StyledLocalPhone, StyledPhoneAndroid } from './styles';

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
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
  onChangeStateController?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleSearch?: (value: string) => void;
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
  renderLeft,
  renderRight,
  onChangeStateController,
  handleSearch,
}: TextFieldPropsApp): JSX.Element {
  const [maskState, setMaskState] = useState(mask);

  return control ? (
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
              ? {
                  inputComponent: TextMaskCustom as any,
                  inputProps: { mask: maskState },
                  startAdornment: renderLeft,
                  endAdornment:
                    type === 'tel' ? (
                      maskState.length >= 15 ? (
                        <StyledLocalPhone onClick={() => setMaskState('(00) 0000-0000')} />
                      ) : (
                        <StyledPhoneAndroid onClick={() => setMaskState('(00) 00000-0000')} />
                      )
                    ) : (
                      renderRight
                    ),
                }
              : currency
              ? {
                  inputComponent: NumberFormatCustom as any,
                  startAdornment: renderLeft,
                  endAdornment: renderRight,
                }
              : { startAdornment: renderLeft, endAdornment: renderRight }
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
  ) : (
    <StyledTextField
      label={label}
      onChange={onChangeStateController}
      onKeyUp={handleSearch ? (e: any) => handleSearch(e.target.value) : undefined}
      InputProps={
        mask
          ? {
              inputComponent: TextMaskCustom as any,
              inputProps: { mask: maskState },
              startAdornment: renderLeft,
              endAdornment:
                type === 'tel' ? (
                  maskState.length >= 15 ? (
                    <StyledLocalPhone onClick={() => setMaskState('(00) 0000-0000')} />
                  ) : (
                    <StyledPhoneAndroid onClick={() => setMaskState('(00) 00000-0000')} />
                  )
                ) : (
                  renderRight
                ),
            }
          : currency
          ? {
              inputComponent: NumberFormatCustom as any,
              startAdornment: renderLeft,
              endAdornment: renderRight,
            }
          : { startAdornment: renderLeft, endAdornment: renderRight }
      }
      variant="standard"
      type={type}
      inputMode={inputMode}
      required={required}
      fullWidth
      disabled={disabled}
    />
  );
}
