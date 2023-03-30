import { NavigateNext } from '@mui/icons-material';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Container, WrapperInfo, Text, WrapperNavigate } from './styles';

interface SaleItemProps {
  onClick: () => void;
  detailSale: InstanceSale;
}

const SaleItem: React.FC<SaleItemProps> = ({
  onClick,
  detailSale: { data_product, total, client, type_sale, updated_at },
}) => {
  return (
    <Container onClick={onClick}>
      <WrapperInfo>
        <Text bold>
          {data_product.length > 1
            ? `${data_product[0].amount} ${data_product[0].name}, [...]`
            : `${data_product[0].amount} ${data_product[0].name}`}
        </Text>
        <Text bold mgTop green>
          {formatNumberToCurrency(total ?? null) || '--'}
        </Text>
        {client?.name && <Text>{client.name}</Text>}
        <Text>{type_sale || '--'}</Text>
      </WrapperInfo>
      <WrapperNavigate>
        <Text>{formatDateTime(updated_at) || '--'}</Text>
        <NavigateNext fontSize="large" style={{ cursor: 'pointer' }} />
      </WrapperNavigate>
    </Container>
  );
};

export default SaleItem;
