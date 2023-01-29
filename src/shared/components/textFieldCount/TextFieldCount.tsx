import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Control, Controller } from 'react-hook-form';
import { useAppThemeContext } from 'shared/contexts';

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
  handleOperation: (onClick?: 'add' | 'subt') => void;
  stateCount: number;
  setStateCount: React.Dispatch<React.SetStateAction<number>>;
}

const TextFieldCount: React.FC<TextFieldCountProps> = ({
  name,
  control,
  label,
  disabled,
  defaultValue,
  handleOperation,
  stateCount,
  setStateCount,
  ...rest
}) => {
  const { themeName } = useAppThemeContext();

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
                <RemoveIcon color="info" />
              </ButtonIcon>
              <StyledNumberFormat
                decimalScale={0}
                value={stateCount !== defaultValue ? stateCount : defaultValue}
                onChange={e => {
                  const inputValue = e.target.value;

                  if (!inputValue.length) {
                    onChange('');
                    setStateCount(undefined);
                  }

                  if (Number(inputValue) >= 1) {
                    setStateCount(undefined);
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
