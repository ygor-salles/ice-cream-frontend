import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { LISTCLIENTS } from '../../../../assets/mocks/ListClients';
import SelectApp from '../../../../shared/components/select/Select';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import {
  IFormPayment,
  IPaymentDTO,
  schemaCreatePayment,
} from '../../../../shared/dtos/IPaymentDTO';
import { Form, StyledButton, StyledDialogActions } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  payment: IPaymentDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormPayment) => Promise<void>;
  handleClose: () => void;
}

export function DialogEdit({
  payment,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
}: DialogEditProps): JSX.Element {
  const { handleSubmit, control } = useForm<IFormPayment>({
    resolver: yupResolver(schemaCreatePayment),
    defaultValues: {
      id: payment.id,
      client_id: payment.client_id.toString(),
      observation: payment.observation,
      value: payment.value.toFixed(2).replace('.', ''),
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
        <DialogTitle id="responsive-dialog-title">EDITAR PAGAMENTO</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextFieldApp
                name="value"
                control={control}
                label="Valor do pagamento"
                currency
                required
              />
            </Grid>
            <Grid item xs={12}>
              <SelectApp
                name="client_id"
                control={control}
                array={LISTCLIENTS}
                setId
                label="Cliente"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp name="observation" control={control} label="Observação" />
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
