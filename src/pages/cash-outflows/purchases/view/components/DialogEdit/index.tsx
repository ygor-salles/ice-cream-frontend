import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CheckboxApp, DialogForm, InputFile, SelectApp, TextFieldApp } from 'shared/components';
import { IFormPurchase } from 'shared/dtos';
import { useProvider } from 'shared/hooks';

import { defaultValuesPurchaseEdit, fieldsPurchase, schemaPurchase } from '../../../utils';
import { LoadingDialog } from './components/LoadingDialog';
import { DialogEditProps } from './types';

export function DialogEdit({
  purchase,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { allProviders, getProviders, loadingProviders } = useProvider();
  const loadingPage = loading || loadingProviders;

  useEffect(() => {
    getProviders();
  }, []);

  const { handleSubmit, control, watch } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaPurchase),
    defaultValues: defaultValuesPurchaseEdit(purchase),
  });

  const values = watch();

  return (
    <DialogForm
      title="EDITAR COMPRA"
      loading={loadingPage}
      onClose={handleClose}
      onSubmit={handleSubmit((data: IFormPurchase) =>
        onSubmitUpdate({ ...data, file: values.file }),
      )}
      open={open}
    >
      {loadingProviders ? (
        <LoadingDialog />
      ) : (
        <>
          <Grid item xs={12}>
            <TextFieldApp
              name={fieldsPurchase.VALUE_TOTAL}
              control={control}
              label="Valor total"
              currency
              required
              disabled={loadingPage}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldApp
              name={fieldsPurchase.OBSERVATION}
              control={control}
              label="Observação"
              disabled={loadingPage}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectApp
              name={fieldsPurchase.PROVIDER_ID}
              control={control}
              options={!loadingProviders ? allProviders : []}
              setId
              sortAlphabeticallyObject
              label="Fornecedor"
              required
              disabled={loadingPage}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckboxApp
              name={fieldsPurchase.ITS_ICE_CREAM_SHOP}
              control={control}
              label="Compra da sorveteria"
              disabled={loadingPage}
            />
          </Grid>
          <Grid item xs={12}>
            <InputFile
              name={fieldsPurchase.FILE}
              isMobile={!!smDown}
              label="Anexe a nota fiscal"
              control={control}
              pathApi={purchase.nf_url}
              disabled={loadingPage}
            />
          </Grid>
        </>
      )}
    </DialogForm>
  );
}
