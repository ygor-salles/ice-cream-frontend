import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

// import TextFieldApp from '../textField/TextField';
import { Container, ButtonIcon, StyledNumberFormat, Label, ContainerInput } from './styles';

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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Label>{label} *</Label>

            <ContainerInput>
              <ButtonIcon
                onClick={() => {
                  if (count >= 2) {
                    setCount(defaultValue => defaultValue - 1);
                  }
                }}
                disabled={disabled}
              >
                <RemoveIcon color="info" />
              </ButtonIcon>
              <StyledNumberFormat
                decimalScale={0}
                value={value || count}
                onChange={onChange}
                disabled={disabled}
                min={1}
                maxLength={3}
                isNumericString
              />
              <ButtonIcon
                isButtonAdd
                onClick={() => setCount(defaultValue => defaultValue + 1)}
                disabled={disabled}
              >
                <AddIcon color="info" />
              </ButtonIcon>
            </ContainerInput>
          </>
        )}
      />
    </Container>
  );
};

export default TextFieldCount;
