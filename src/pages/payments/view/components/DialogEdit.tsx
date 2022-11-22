import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';

import { LISTCLIENTS } from '../../../../assets/mocks/ListClients';
import FooterDialogActions from '../../../../shared/components/footerDialogActions/FooterDialogActions';
import SelectApp from '../../../../shared/components/select/Select';
import TextFieldApp from '../../../../shared/components/textField/TextField';
import {
  IFormPayment,
  IPaymentDTO,
  schemaCreatePayment,
} from '../../../../shared/dtos/IPaymentDTO';
import { Form } from './styles';

interface DialogEditProps {
  smDown?: boolean;
  payment: IPaymentDTO;
  open: boolean;
  onSubmitUpdate: (dataForm: IFormPayment) => Promise<void>;
  handleClose: () => void;
  loading: boolean;
}

export function DialogEdit({
  payment,
  smDown,
  onSubmitUpdate,
  open,
  handleClose,
  loading,
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
                disabled={loading}
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
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldApp
                name="observation"
                control={control}
                label="Observação"
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
