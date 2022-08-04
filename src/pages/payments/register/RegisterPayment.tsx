import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LISTCLIENTS } from '../../../assets/mocks/ListClients';
import { NumberFormatCustom } from '../../../shared/components';
import SelectApp from '../../../shared/components/select/Select';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import {
  IFormPayment,
  IPaymentDTO,
  schemaCreatePayment,
  transformObjectPayment,
} from '../../../shared/dtos/IPaymentDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import PaymentService from '../../../shared/services/PaymentService';
import { Form, StyledCard } from './styles';

export function RegisterPayment(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const { handleSubmit, control, reset } = useForm<IFormPayment>({
    resolver: yupResolver(schemaCreatePayment),
    defaultValues: {
      value: '',
      client_id: '',
      observation: '',
    },
  });

  async function handleSubmitCreate(dataForm: IFormPayment) {
    setLoading(true);
    const data: IPaymentDTO = transformObjectPayment(dataForm);

    const paymentService = new PaymentService();
    try {
      await paymentService.create(data);
      displayNotificationMessage(false, 'Pagamento cadastrado com sucesso!');
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(true, `Erro ao cadastrar pagamento - ${response?.data?.message}`);
    } finally {
      setLoading(false);
      reset();
    }
  }

  return (
    <>
      <Snackbar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />
      <LayoutBaseDePagina
        titulo="Cadastro pagamento"
        navigatePage="/payments"
        textButton="VOLTAR"
        icon="arrow_back"
      >
        <Form noValidate onSubmit={handleSubmit(handleSubmitCreate)}>
          <StyledCard>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextFieldApp
                  name="value"
                  control={control}
                  label="Valor do pagamento"
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
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

            <Grid container sx={{ mt: 6 }}>
              <Grid item display="flex" justifyContent="flex-end" width="100%">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={!!smDown}
                  sx={{
                    bgcolor: 'primary',
                    padding: smDown ? '10px' : 'auto',
                    fontSize: smDown ? '1rem' : 'auto',
                  }}
                  endIcon={
                    loading ? (
                      <CircularProgress variant="indeterminate" color="inherit" size={20} />
                    ) : undefined
                  }
                  disabled={loading}
                >
                  CADASTRAR
                </Button>
              </Grid>
            </Grid>
          </StyledCard>
        </Form>
      </LayoutBaseDePagina>
    </>
  );
}
