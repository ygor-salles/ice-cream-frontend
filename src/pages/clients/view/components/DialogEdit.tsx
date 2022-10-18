import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../../shared/components';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import { IFormClient, IClientDTO, schemaCreateClient } from '../../../../shared/dtos/IClientDTO';
import { Form, StyledButton, StyledDialogActions } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  client: IClientDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormClient) => Promise<void>;
  handleClose: () => void;
}

export function DialogEdit({
  client,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
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
              <TextFieldApp name="name" control={control} label="Nome do cliente" required />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="debit"
                control={control}
                label="Dívida do cliente"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="phone"
                control={control}
                label="Telefone"
                type="tel"
                mask="(99) 99999-9999"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <StyledDialogActions>
          <StyledButton variant="outlined" type="button" onClick={handleClose}>
            CANCELAR
          </StyledButton>
          <Button variant="contained" type="submit">
            EDITAR
          </Button>
        </StyledDialogActions>
      </Form>
    </Dialog>
  );
}
