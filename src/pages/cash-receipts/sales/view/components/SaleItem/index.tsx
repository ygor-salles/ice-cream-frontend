import { NavigateNext } from '@mui/icons-material';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Container, WrapperInfo, Text, WrapperNavigate, TextCustom, Row } from './styles';

interface SaleItemProps {
  onClick: () => void;
  detailSale: InstanceSale;
}

const SaleItem: React.FC<SaleItemProps> = ({
  onClick,
  detailSale: { data_product, total, client, type_sale, created_at, observation },
}) => {
  return (
    <Container onClick={onClick}>
      <Row>
        <Text bold>
          {data_product?.length > 1
            ? `${data_product[0].amount} ${data_product[0].name}, [...]`
            : data_product?.length === 1
            ? `${data_product[0].amount} ${data_product[0].name}`
            : ''}
        </Text>
        <Text>{formatDateTime(created_at) || '--'}</Text>
      </Row>
      <Row alignCenter>
        <WrapperInfo>
          <Text bold mgTop green>
            {formatNumberToCurrency(total ?? null) || '--'}
          </Text>
          <div>
            {client?.name ? (
              <TextCustom>{client.name}</TextCustom>
            ) : (
              <TextCustom>{observation}</TextCustom>
            )}
          </div>
          <Text>{type_sale || '--'}</Text>
        </WrapperInfo>
        <WrapperNavigate>
          <NavigateNext fontSize="large" style={{ cursor: 'pointer' }} />
        </WrapperNavigate>
      </Row>
    </Container>
  );
};

export default SaleItem;
