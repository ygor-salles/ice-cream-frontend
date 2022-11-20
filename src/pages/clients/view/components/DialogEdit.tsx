import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import FooterDialogActions from '../../../../shared/components/footerDialogActions/FooterDialogActions';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import { IClientDTO, IFormClient, schemaCreateClient } from '../../../../shared/dtos/IClientDTO';
import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  client: IClientDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormClient) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  client,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormClient>({
    resolver: yupResolver(schemaCreateClient),
    defaultValues: {
      id: client.id,
      name: client.name,
      debit: client.debit.toFixed(2).replace('.', ''),
      phone: client.phone,
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
        <DialogTitle id="responsive-dialog-title">EDITAR PRODUTO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name="name"
                control={control}
                label="Nome do cliente"
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="debit"
                control={control}
                label="Dívida do cliente"
                currency
                required
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="phone"
                control={control}
                label="Telefone"
                type="tel"
                mask="(00) 00000-0000"
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
