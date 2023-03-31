import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { IFormSale } from 'shared/dtos/ISaleDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { IUpdateSaleDTORequest } from 'shared/services/SaleService/dtos/IUpdateSaleDTO';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import DialogCreateSale from './DialogCreateSale';
import { Text, Title, WrapperDetail, StyledCardList, BttIcon } from './styles';

interface SaleDetailItemProps {
  oldSaleDetail: InstanceSale;
  saleDetail: InstanceSale;
  loading: boolean;
  onClose: () => void;
  onDeleteSale: () => void;
  onInsertProductInSale: (data: IFormSale) => void;
  onDeleteProductInSale: (data: IDataProduct) => void;
  onSubmitUpdate: (data: IUpdateSaleDTORequest) => Promise<void>;
}

const SaleDetailItem: React.FC<SaleDetailItemProps> = ({
  oldSaleDetail,
  saleDetail,
  loading,
  onClose,
  onDeleteSale,
  onInsertProductInSale,
  onDeleteProductInSale,
  onSubmitUpdate,
}) => {
  const [disabledActions, setDisabledActions] = useState(true);

  const [showDialogSale, setShowDialogSale] = useState(false);

  return (
    <>
      <Title>
        Detalhes de vendas{' '}
        <BttIcon type="button" disabled={loading} onClick={() => setDisabledActions(prev => !prev)}>
          <Edit color="primary" />
        </BttIcon>
      </Title>
      <StyledCardList
        listSale={saleDetail.data_product ?? []}
        observation={saleDetail.observation}
        updated_at={saleDetail.updated_at}
        type_sale={saleDetail.type_sale}
        disabledActions={disabledActions}
        onAddList={() => setShowDialogSale(true)}
        onDeleteList={onDeleteProductInSale}
        onClickPrimary={onDeleteSale}
        onClickSeconadary={onClose}
        textPrimary="Deletar"
        textSecondary={disabledActions ? 'Ok' : 'Cancelar'}
        renderTopButtons={
          oldSaleDetail.data_product.length !== saleDetail.data_product.length && (
            <Button
              type="button"
              variant="contained"
              color="secondary"
              disabled={loading}
              onClick={() => onSubmitUpdate(saleDetail)}
            >
              Salvar
            </Button>
          )
        }
        loading={loading}
        totalSum={saleDetail.total}
        renderMain={
          saleDetail.client && (
            <WrapperDetail>
              <Text>
                <b>Cliente:</b> {saleDetail.client?.name || '--'}
              </Text>
              <Text>
                <b>Telefone:</b> {saleDetail.client?.phone || '--'}
              </Text>
              <Text>
                <b>Dívida atual:</b>{' '}
                {saleDetail.client?.debit ? formatNumberToCurrency(saleDetail.client?.debit) : '--'}
              </Text>
            </WrapperDetail>
          )
        }
      />

      <DialogCreateSale
        open={showDialogSale}
        onClose={() => setShowDialogSale(false)}
        onSubmit={onInsertProductInSale}
      />
    </>
  );
};

export default SaleDetailItem;
