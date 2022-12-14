import { NavigateNext } from '@mui/icons-material';

import { Container, WrapperInfo, Text, WrapperNavigate } from './styles';

interface SaleItemProps {
  onClick: () => void;
}

const SaleItem: React.FC<SaleItemProps> = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <WrapperInfo>
        <Text bold>1 Açaí de 200ml com combinações</Text>
        <Text bold mgTop green>
          R$ 10,50
        </Text>
        <Text>Maria Enilda Cassia</Text>
        <Text>Pix</Text>
      </WrapperInfo>
      <WrapperNavigate>
        <Text>20/06/2022</Text>
        <NavigateNext fontSize="large" />
      </WrapperNavigate>
    </Container>
  );
};

export default SaleItem;
