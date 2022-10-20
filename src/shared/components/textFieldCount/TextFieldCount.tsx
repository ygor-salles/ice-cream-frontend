import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Control } from 'react-hook-form';

import TextFieldApp from '../textField/TextField';
import { Container, ButtonIcon } from './styles';

interface TextFieldCountProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  label: React.ReactNode;
}

const TextFieldCount: React.FC<TextFieldCountProps> = ({ name, control, label }) => {
  return (
    <Container>
      <ButtonIcon>
        <RemoveIcon color="info" />
      </ButtonIcon>
      <TextFieldApp control={control} label={label} name={name} disabled required />
      <ButtonIcon isButtonAdd>
        <AddIcon color="info" />
      </ButtonIcon>
    </Container>
  );
};

export default TextFieldCount;
