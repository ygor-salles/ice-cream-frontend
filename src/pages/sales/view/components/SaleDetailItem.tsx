import { Theme, useMediaQuery } from '@mui/material';

import { Text, Title, Value, WrapperDetail, StyledButton, FooterDetail, Li, Ul } from './styles';

interface SaleDetailItemProps {
  onClose: () => void;
  onDeleteSale: () => void;
}

const SaleDetailItem: React.FC<SaleDetailItemProps> = ({ onClose, onDeleteSale }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const options = ['Leite condensado', 'Leite em pó', 'Granola', 'Musse de maracujá'];

  return (
    <>
      <Title>Detalhes de vendas</Title>
      <WrapperDetail borderBottom>
        <Text>1 Açaí de 300ml</Text>
        <Ul>
          {options.map(item => (
            <Li key={item}>{item}</Li>
          ))}
        </Ul>
        <Text>Tipo de transação: Pix</Text>
        <Text>Data: 20/06/2022 - 14:30</Text>
        <Value>Total: R$ 10,50</Value>
      </WrapperDetail>
      <WrapperDetail>
        <Text>Cliente: Maria Enilda Cássia</Text>
        <Text>Telefone: (35) 984092972</Text>
      </WrapperDetail>
      <FooterDetail isMobile={smDown}>
        <StyledButton variant="outlined" onClick={onDeleteSale}>
          Deletar
        </StyledButton>
        <StyledButton variant="contained" onClick={onClose}>
          OK
        </StyledButton>
      </FooterDetail>
    </>
  );
};

export default SaleDetailItem;
