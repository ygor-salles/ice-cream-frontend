import { Add, Remove } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import { useThemeContext } from 'shared/hooks/useThemeContext';

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
  handleOperation,
  stateCount,
  setStateCount,
  ...rest
}: TextFieldCountProps) => {
  const { themeName } = useThemeContext();

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
              <ButtonIcon
                type="button"
                onClick={() => {
                  if (stateCount >= 2) {
                    setStateCount(defaultValue => defaultValue - 1);
                    onChange(stateCount - 1);
                  }
                  if (stateCount === undefined) {
                    setStateCount(defaultValue);
                    onChange(defaultValue);
                  }
                  handleOperation('subt');
                }}
                disabled={disabled}
              >
                <Remove color="info" />
              </ButtonIcon>
              <StyledNumberFormat
                decimalScale={0}
                value={stateCount !== defaultValue ? stateCount : defaultValue}
                onChange={e => {
                  const inputValue = e.target.value;

                  if (!inputValue.length) {
                    onChange('');
                    setStateCount(1);
                  }

                  if (Number(inputValue) >= 1) {
                    setStateCount(1);
                    onChange(inputValue);
                    handleOperation();
                  }
                }}
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
                onClick={() => {
                  setStateCount(defaultValue => defaultValue + 1);
                  onChange(stateCount + 1);
                  if (stateCount === undefined) {
                    setStateCount(defaultValue);
                    onChange(defaultValue);
                  }
                  handleOperation('add');
                }}
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
