import { Edit } from '@mui/icons-material';
import { useState } from 'react';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import { Text, Title, WrapperDetail, StyledCardList, BttIcon } from './styles';

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
  const [disabledActions, setDisabledActions] = useState(true);

  return (
    <>
      <Title>
        Detalhes de vendas{' '}
        <BttIcon type="button" onClick={() => setDisabledActions(prev => !prev)}>
          <Edit color="primary" />
        </BttIcon>
      </Title>
      <StyledCardList
        listSale={data_product ?? []}
        observation={observation}
        updated_at={updated_at}
        type_sale={type_sale}
        disabledActions={disabledActions}
        onAddList={() => console.log('adicionar')}
        onDeleteList={() => console.log('delete')}
        onClickPrimary={onDeleteSale}
        onClickSeconadary={onClose}
        textPrimary="Deletar"
        textSecondary={disabledActions ? 'Ok' : 'Cancelar'}
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
