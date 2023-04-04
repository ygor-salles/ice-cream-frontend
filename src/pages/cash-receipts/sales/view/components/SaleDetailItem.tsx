import { yupResolver } from '@hookform/resolvers/yup';
import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import { IFormEditSale, IFormSale, schemaEditSale, transformItemArray } from 'shared/dtos/ISaleDTO';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import formatDateTime from 'shared/utils/formatDateTime';
import { formatNumberToCurrency } from 'shared/utils/formatNumberToCurrency';

import DialogCreateSale from './DialogCreateSale';
import { BttIcon, StyledCardList, Text, Title, WrapperDetail } from './styles';

interface SaleDetailItemProps {
  saleDetail: InstanceSale;
  loading: boolean;
  onClose: () => void;
  onDeleteSale: () => void;
  onSubmitUpdate: (data: IFormEditSale) => Promise<void>;
}

const SaleDetailItem: React.FC<SaleDetailItemProps> = ({
  saleDetail,
  loading,
  onClose,
  onDeleteSale,
  onSubmitUpdate,
}) => {
  const [disabledActions, setDisabledActions] = useState(true);

  const [showDialogSale, setShowDialogSale] = useState(false);

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormEditSale>({
    resolver: yupResolver(schemaEditSale),
    defaultValues: {
      id: saleDetail.id,
      observation: saleDetail.observation,
      type_sale: saleDetail.type_sale,
      created_at: formatDateTime(saleDetail.created_at) ?? '--',
      updated_at: formatDateTime(saleDetail.updated_at) ?? '--',
      data_product: saleDetail.data_product,
      total: saleDetail.total,
      client: saleDetail.client,
      client_id: saleDetail.client_id,
    },
  });

  const { data_product, total, client } = watch();

  const {
    field: { onChange: onChangeDataProduct },
  } = useController({ name: 'data_product', control });

  const onInsertProductInSale = (data: IFormSale) => {
    const newItem: IDataProduct = transformItemArray(data);

    if (newItem.combinations.length === 0) {
      delete newItem.combinations;
    }

    onChangeDataProduct([...data_product, newItem]);
    setValue('total', total + newItem.total);
  };

  const onDeleteProductInSale = (data: IDataProduct) => {
    if (data_product?.length) {
      const newDataProduct = data_product.filter(item => item !== data);

      onChangeDataProduct([...newDataProduct]);
      setValue('total', total - data.total);
    }
  };

  return (
    <>
      <Title>
        Detalhes de vendas{' '}
        <BttIcon type="button" disabled={loading} onClick={() => setDisabledActions(prev => !prev)}>
          <Edit color="primary" />
        </BttIcon>
      </Title>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmitUpdate)}>
        <StyledCardList
          listSale={data_product ?? []}
          control={control}
          hasClient={!!client}
          disabledActions={disabledActions}
          onAddList={() => setShowDialogSale(true)}
          onDeleteList={onDeleteProductInSale}
          onClickPrimary={onDeleteSale}
          onClickSeconadary={onClose}
          textPrimary="Deletar"
          textSecondary={disabledActions ? 'Ok' : 'Cancelar'}
          renderTopButtons={
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading || !isValid || !isDirty}
            >
              Salvar
            </Button>
          }
          loading={loading}
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
                  <b>Dívida atual:</b>{' '}
                  {client?.debit ? formatNumberToCurrency(client?.debit) : '--'}
                </Text>
              </WrapperDetail>
            )
          }
        />
      </form>

      <DialogCreateSale
        open={showDialogSale}
        onClose={() => setShowDialogSale(false)}
        onSubmit={onInsertProductInSale}
      />
    </>
  );
};

export default SaleDetailItem;
