import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import CheckboxApp from 'shared/components/checkbox/CheckboxApp';
import FooterDialogActions from 'shared/components/footerDialogActions/FooterDialogActions';
import TextFieldApp from 'shared/components/textField/TextField';
import {
  defaultValuesProviderEdit,
  fieldsProvider,
  IFormProvider,
  IProviderDTO,
  schemaCreateProvider,
} from 'shared/dtos/IProviderDTO';

import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  provider: IProviderDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormProvider) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  provider,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormProvider>({
    resolver: yupResolver(schemaCreateProvider),
    defaultValues: defaultValuesProviderEdit(provider),
  });

  return (
    <Dialog
      fullScreen={smDown}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Form onSubmit={handleSubmit(onSubmitUpdate)} smDown={smDown}>
        <DialogTitle id="responsive-dialog-title">EDITAR FORNECEDOR</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsProvider.NAME}
                control={control}
                label="Nome do fornecedor"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name={fieldsProvider.PHONE}
                type="tel"
                mask="(00) 00000-0000"
                control={control}
                label="Telefone"
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <CheckboxApp
                name={fieldsProvider.ITS_ICE_CREAM_SHOP}
                control={control}
                label="Fornecedor da sorveteria"
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
