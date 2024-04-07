/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, Remove } from '@mui/icons-material';
import { ChangeEvent } from 'react';
import { Controller } from 'react-hook-form';
import { useThemeContext } from 'shared/hooks';

import {
  ButtonIcon,
  Container,
  ContainerInput,
  Label,
  StyledNumberFormat,
  TextError,
} from './styles';
import { TextFieldCountProps } from './types';

export const TextFieldCount = ({
  name,
  control,
  label,
  disabled,
  defaultValue,
  valueCurrent,
  handleOperation,
  ...rest
}: TextFieldCountProps) => {
  const { themeName } = useThemeContext();

  const handleDecrement = (onChange: (...event: any[]) => void) => {
    return () => {
      if (Number(valueCurrent) >= 2) {
        const decrement = Number(valueCurrent) - 1;
        onChange(decrement.toString());
      }

      if (valueCurrent === '') {
        onChange(defaultValue);
      }
      handleOperation('subt');
    };
  };

  const handleChangeInput = (onChange: (...event: any[]) => void) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (!inputValue.length) {
        onChange('');
        handleOperation('onChange');
      }

      if (Number(inputValue) >= 1) {
        onChange(inputValue);
        handleOperation('onChange');
      }
    };
  };

  const handleIncrement = (onChange: (...event: any[]) => void) => {
    return () => {
      const increment = Number(valueCurrent) + 1;
      onChange(increment.toString());

      if (valueCurrent === '') {
        onChange(defaultValue);
      }
      handleOperation('add');
    };
  };

  return (
    <Container {...rest}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Label isError={!!error?.message || false} isDarkTheme={themeName === 'dark'}>
              {label} *
            </Label>

            <ContainerInput>
              <ButtonIcon type="button" onClick={handleDecrement(onChange)} disabled={disabled}>
                <Remove color="info" />
              </ButtonIcon>

              <StyledNumberFormat
                decimalScale={0}
                value={valueCurrent !== defaultValue ? valueCurrent : defaultValue}
                onChange={handleChangeInput(onChange)}
                disabled={disabled}
                min={1}
                maxLength={3}
                isNumericString
                isError={!!error?.message || false}
                isDarkTheme={themeName === 'dark'}
              />

              <ButtonIcon
                type="button"
                isButtonAdd
                onClick={handleIncrement(onChange)}
                disabled={disabled}
              >
                <Add color="info" />
              </ButtonIcon>
            </ContainerInput>
            {error && <TextError>{error?.message}</TextError>}
          </>
        )}
      />
    </Container>
  );
};
