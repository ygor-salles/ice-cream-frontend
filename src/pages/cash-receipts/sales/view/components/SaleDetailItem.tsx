import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { IFormSale } from 'shared/dtos/ISaleDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import DialogCreateSale from './DialogCreateSale';
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

  const [showDialogSale, setShowDialogSale] = useState(false);

  const handleInsertSale = (data: IFormSale) => console.log('insert', data);

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
        onAddList={() => setShowDialogSale(true)}
        onDeleteList={() => console.log('delete')}
        onClickPrimary={onDeleteSale}
        onClickSeconadary={onClose}
        textPrimary="Deletar"
        textSecondary={disabledActions ? 'Ok' : 'Cancelar'}
        renderTopButtons={
          <Button
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => console.log('salvar')}
          >
            Salvar
          </Button>
        }
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

      <DialogCreateSale
        open={showDialogSale}
        onClose={() => setShowDialogSale(false)}
        onSubmit={handleInsertSale}
      />
    </>
  );
};

export default SaleDetailItem;
