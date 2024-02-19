/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import { NumberFormatCustom } from '../NumberFormatCustom';
import { TextMaskCustom } from '../TextMaskCustom';
import { StyledTextField, StyledLocalPhone, StyledPhoneAndroid } from './styles';
import { TextFieldAppProps } from './types';

export function TextFieldApp({
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
  variant = 'standard',
  onChangeStateController,
  handleSearch,
  ...rest
}: TextFieldAppProps) {
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
          variant={variant}
          type={type}
          inputMode={inputMode}
          error={!!error}
          helperText={error ? error.message : null}
          required={required}
          fullWidth
          disabled={disabled}
          {...rest}
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
      {...rest}
    />
  );
}
