import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import { IFormPurchase, IPurchaseDTO, schemaCreatePurchase } from 'shared/dtos/IPurchaseDTO';
import { useProvider } from 'shared/hooks/network/useProvider';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';

import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  purchase: IPurchaseDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormPurchase) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  purchase,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { allProviders, getProviders, loadingProviders } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  const { handleSubmit, control } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaCreatePurchase),
    defaultValues: {
      id: purchase.id,
      value_total: formatNumberToCurrencyInput(purchase.value_total),
      observation: purchase.observation,
      its_ice_cream_shoop: purchase.its_ice_cream_shoop,
      nf_url: purchase.nf_url,
      provider_id: purchase.provider_id.toString(),
    },
  });

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Form noValidate onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
        <DialogTitle id="responsive-dialog-title">EDITAR COMPRA</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name="value_total"
                control={control}
                label="Valor total"
                currency
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="observation"
                control={control}
                label="Observação"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectApp
                name="provider_id"
                control={control}
                options={allProviders}
                setId
                sortAlphabeticallyObject
                label="Fornecedor"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxApp
                name="its_ice_cream_shoop"
                control={control}
                label="Compra da sorveteria"
                disabled={loading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <FooterDialogActions
          textButtonConfirm="EDITAR"
          textButtonCancel="CANCELAR"
          onClose={handleClose}
          loading={loading}
        />
      </Form>
    </Dialog>
  );
}
