import { Theme, useMediaQuery } from '@mui/material';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Text, Title, Value, WrapperDetail, StyledButton, FooterDetail, Li, Ul } from './styles';

interface SaleDetailItemProps {
  onClose: () => void;
  onDeleteSale: () => void;
  saleDetail: InstanceSale;
}

const SaleDetailItem: React.FC<SaleDetailItemProps> = ({ onClose, onDeleteSale, saleDetail }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <Title>Detalhes de vendas</Title>
      <WrapperDetail borderBottom>
        <Text>
          <b>Produto:</b>{' '}
          {`${saleDetail?.amount || '--'} ${saleDetail?.data_product?.name || '--'}`}
        </Text>
        <Text>
          <b>Preço unitário:</b>{' '}
          {formatNumberToCurrency(saleDetail?.data_product?.price ?? null) || '--'}
        </Text>
        <Ul>
          {saleDetail?.data_product?.combinations?.map(item => (
            <Li key={item.id}>{`${item.name} - ${formatNumberToCurrency(item.price)}`}</Li>
          )) || '--'}
        </Ul>
        <Text>
          <b>Tipo de transação:</b> {saleDetail?.type_sale || '--'}
        </Text>
        <Text>
          <b>Data:</b> {formatDateTime(saleDetail?.updated_at) || '--'}
        </Text>
        <Text>
          <b>Observação:</b> {saleDetail?.observation || '--'}
        </Text>
        <Value>
          <b>Total:</b> {formatNumberToCurrency(saleDetail?.total ?? null) || '--'}
        </Value>
      </WrapperDetail>

      {saleDetail?.client && (
        <WrapperDetail>
          <Text>
            <b>Cliente:</b> {saleDetail?.client?.name || '--'}
          </Text>
          <Text>
            <b>Telefone:</b> {saleDetail?.client?.phone || '--'}
          </Text>
          <Text>
            <b>Dívida atual:</b>{' '}
            {saleDetail?.client?.debit ? formatNumberToCurrency(saleDetail?.client?.debit) : '--'}
          </Text>
        </WrapperDetail>
      )}

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
