import { NavigateNext } from '@mui/icons-material';

import { InstanceSale } from '../../../../shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from '../../../../shared/utils/formatDateTime';
import { formatNumberToCurrency } from '../../../../shared/utils/formatNumberToCurrency';
import { Container, WrapperInfo, Text, WrapperNavigate } from './styles';

interface SaleItemProps {
  onClick: () => void;
  detailSale: InstanceSale;
}

const SaleItem: React.FC<SaleItemProps> = ({ onClick, detailSale }) => {
  return (
    <Container onClick={onClick}>
      <WrapperInfo>
        <Text bold>{`${detailSale?.amount || '--'} ${
          detailSale?.data_product?.name || '--'
        }`}</Text>
        <Text bold mgTop green>
          {formatNumberToCurrency(detailSale?.total ?? null) || '--'}
        </Text>
        <Text>{detailSale?.client?.name || '--'}</Text>
        <Text>{detailSale?.type_sale || '--'}</Text>
      </WrapperInfo>
      <WrapperNavigate>
        <Text>{formatDateTime(detailSale?.updated_at) || '--'}</Text>
        <NavigateNext fontSize="large" />
      </WrapperNavigate>
    </Container>
  );
};

export default SaleItem;
