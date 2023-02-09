import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from 'shared/components/select/Select';
import TextFieldApp from 'shared/components/textField/TextField';
import {
  defaultValuesPurchaseEdit,
  fieldsPurchase,
  IFormPurchase,
  IPurchaseDTO,
  schemaCreatePurchase,
} from 'shared/dtos/IPurchaseDTO';
import { useProvider } from 'shared/hooks/network/useProvider';

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
  const { allProviders, getProviders } = useProvider();

  useEffect(() => {
    getProviders();
  }, []);

  const { handleSubmit, control } = useForm<IFormPurchase>({
    resolver: yupResolver(schemaCreatePurchase),
    defaultValues: defaultValuesPurchaseEdit(purchase),
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
                name={fieldsPurchase.VALUE_TOTAL}
                control={control}
                label="Valor total"
                currency
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsPurchase.OBSERVATION}
                control={control}
                label="Observação"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <SelectApp
                name={fieldsPurchase.PROVIDER_ID}
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
                name={fieldsPurchase.ITS_ICE_CREAM_SHOP}
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
