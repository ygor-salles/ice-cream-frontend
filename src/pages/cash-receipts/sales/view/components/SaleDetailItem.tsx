import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Text, Title, WrapperDetail, StyledCardList } from './styles';

interface SaleDetailItemProps {
  onClose: () => void;
  onDeleteSale: () => void;
  saleDetail: InstanceSale;
}

const SaleDetailItem: React.FC<SaleDetailItemProps> = ({
  onClose,
  onDeleteSale,
  saleDetail: { client, data_product, observation, updated_at, type_sale, total },
}) => {
  return (
    <>
      <Title>Detalhes de vendas</Title>
      <StyledCardList
        listSale={data_product ?? []}
        observation={observation}
        updated_at={updated_at}
        type_sale={type_sale}
        onDeleteList={() => console.log('delete')}
        onClickPrimary={onDeleteSale}
        onClickSeconadary={onClose}
        textPrimary="Deletar"
        textSecondary="Ok"
        totalSum={total}
        renderMain={
          client && (
            <WrapperDetail>
              <Text>
                <b>Cliente:</b> {client?.name || '--'}
              </Text>
              <Text>
                <b>Telefone:</b> {client?.phone || '--'}
              </Text>
              <Text>
                <b>Dívida atual:</b> {client?.debit ? formatNumberToCurrency(client?.debit) : '--'}
              </Text>
            </WrapperDetail>
          )
        }
      />
    </>
  );
};

export default SaleDetailItem;
