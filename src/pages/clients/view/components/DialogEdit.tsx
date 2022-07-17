import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

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
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    name="name"
                    label="Nome"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="debit"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    label="Débito do Cliente"
                    value={value}
                    onChange={onChange}
                    name="debit"
                    id="price"
                    InputProps={{
                      inputComponent: NumberFormatCustom as any,
                    }}
                    error={!!error}
                    helperText={error ? error.message : null}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <TextFieldApp
                    name="phone"
                    label="Telefone"
                    value={value}
                    onChange={onChange}
                    error={!!error}
                    helperText={error ? error.message : null}
                  />
                )}
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
