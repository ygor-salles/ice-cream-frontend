import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

// import TextFieldApp from '../textField/TextField';
import {
  Container,
  ButtonIcon,
  StyledNumberFormat,
  Label,
  ContainerInput,
  TextError,
} from './styles';

interface TextFieldCountProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
  defaultValue: number;
  disabled?: boolean;
}

const TextFieldCount: React.FC<TextFieldCountProps> = ({
  name,
  control,
  label,
  disabled,
  defaultValue,
}) => {
  const [count, setCount] = useState(defaultValue);

  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <Label isError={!!error?.message || false}>{label} *</Label>

            <ContainerInput>
              <ButtonIcon
                type="button"
                onClick={() => {
                  if (count >= 2) {
                    setCount(defaultValue => defaultValue - 1);
                    onChange(defaultValue - 1);
                  }
                  if (count === undefined) {
                    setCount(defaultValue);
                    onChange(defaultValue);
                  }
                }}
                disabled={disabled}
              >
                <RemoveIcon color="info" />
              </ButtonIcon>
              <StyledNumberFormat
                decimalScale={0}
                value={count !== defaultValue ? count : defaultValue}
                onChange={e => {
                  setCount(undefined);
                  onChange(e.target.value);
                }}
                disabled={disabled}
                min={1}
                maxLength={3}
                isNumericString
                isError={!!error?.message || false}
              />
              <ButtonIcon
                type="button"
                isButtonAdd
                onClick={() => {
                  setCount(defaultValue => defaultValue + 1);
                  if (count === undefined) {
                    setCount(defaultValue);
                    onChange(defaultValue + 1);
                  }
                }}
                disabled={disabled}
              >
                <AddIcon color="info" />
              </ButtonIcon>
            </ContainerInput>
            {error && <TextError>{error?.message}</TextError>}
          </>
        )}
      />
    </Container>
  );
};

export default TextFieldCount;
