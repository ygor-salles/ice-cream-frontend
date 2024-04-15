import { yupResolver } from '@hookform/resolvers/yup';
import { Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckboxApp, DialogInfo, HeaderButtonNav } from 'shared/components';
import { ToastType } from 'shared/components/SnackBar/enum';
import { EnumTypeSale, EnumTypeProduct, IFormEditSale, IFormSale } from 'shared/dtos';
import { useToastContext, useSale } from 'shared/hooks';
import { BaseLayout } from 'shared/layouts';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import { InstanceSale } from 'shared/services/SaleService/dtos/ILoadPagedSalesDTO';
import { formatDateTime, formatNumberToCurrency } from 'shared/utils';

import { fieldsSale, schemaEditSale, transformItemArray } from '../utils';
import { DialogCreateSale } from '../view/components/DialogCreateSale';
import { StyledCardList, Text, WrapperDetail } from './styles';

export const SaleDetail = () => {
  const [disabledActions, setDisabledActions] = useState(true);
  const [showDialogSale, setShowDialogSale] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { created_at, updated_at, ...saleDetail }: InstanceSale = state.saleDetail;

  const { addToast } = useToastContext();

  const { updateSaleById, handleSubmitDelete, loadingSales, loadingForm } = useSale();
  const loading = loadingSales || loadingForm;

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<IFormEditSale>({
    resolver: yupResolver(schemaEditSale),
    defaultValues: {
      ...saleDetail,
      created_at: formatDateTime(created_at) ?? '--',
      updated_at: formatDateTime(updated_at) ?? '--',
    },
  });

  const { data_product, total, client } = watch();

  const {
    field: { onChange: onChangeDataProduct },
  } = useController({ name: 'data_product', control });

  const hasAcai = useMemo(() => {
    return saleDetail.data_product && Array.isArray(saleDetail.data_product)
      ? Boolean(saleDetail.data_product?.find(item => item.type === EnumTypeProduct.ACAI))
      : false;
  }, [saleDetail.data_product]);

  const handleToggleActions = () => setDisabledActions(prev => !prev);

  const onInsertProductInSale = (data: IFormSale) => {
    const newItem: IDataProduct = transformItemArray(data);

    if (newItem.type === EnumTypeProduct.ACAI && !saleDetail.in_progress) {
      addToast(
        'Não é possível adicionar novos açaís nessa venda pois esse pedido ja foi concluído na tela de Pedidos ativos. Por favor cadastre uma nova venda!',
        ToastType.error,
      );
      return;
    }

    if (newItem?.combinations?.length === 0) {
      delete newItem.combinations;
    }

    if (data_product) {
      onChangeDataProduct([...data_product, newItem]);
    } else {
      onChangeDataProduct([newItem]);
    }
    setValue('total', total + newItem.total);
  };

  const onDeleteProductInSale = (data: IDataProduct) => {
    if (data_product?.length) {
      const newDataProduct = data_product.filter(item => item !== data);

      onChangeDataProduct([...newDataProduct]);
      setValue('total', total - data.total);
    }
  };

  const deletedSale = async () => {
    setShowModalDelete(false);
    await handleSubmitDelete(saleDetail.id);
  };

  return (
    <BaseLayout
      title="Detalhes de venda"
      renderHeaderRight={
        <HeaderButtonNav
          route={undefined}
          textButton="EDITAR"
          icon={<Edit />}
          onClick={handleToggleActions}
        />
      }
    >
      <form
        style={{ width: '100%' }}
        onSubmit={handleSubmit(async (dataForm: IFormEditSale) => {
          await updateSaleById(dataForm);
          navigate(-1);
        })}
      >
        {hasAcai && !disabledActions && (
          <CheckboxApp
            name={fieldsSale.IN_PROGRESS}
            control={control}
            label="Ativo na lista de pedidos"
            disabled={loading}
          />
        )}
        <StyledCardList
          listSale={data_product ?? []}
          control={control}
          hasClient={!!client}
          disabledActions={disabledActions}
          onAddList={() => setShowDialogSale(true)}
          onDeleteList={onDeleteProductInSale}
          onClickPrimary={() => setShowModalDelete(true)}
          onClickSeconadary={() => navigate(-1)}
          textPrimary="Deletar"
          textSecondary={disabledActions ? 'Ok' : 'Cancelar'}
          renderTopButtons={
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={
                (loading || !isValid || !isDirty) &&
                saleDetail.data_product.length === data_product?.length
              }
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

      <DialogInfo
        open={showModalDelete}
        title="Deletar Venda"
        text={
          saleDetail.type_sale === EnumTypeSale.DEBIT
            ? 'Tem certeza que deseja deletar essa venda? 🤔🤔🤔 Ao deletar uma venda FIADO irá subtratir a dívida do cliente ❗❗'
            : 'Tem certeza que deseja deletar essa venda? 🤔'
        }
        textButtonSubmit="DELETAR"
        textButtonClose="CANCELAR"
        handleClose={() => setShowModalDelete(false)}
        handleSubmit={deletedSale}
        loading={loadingForm}
      />
    </BaseLayout>
  );
};
