import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import {
  IFormClient,
  IClientDTO,
  schemaCreateClient,
  transformObjectClient,
} from '../../../shared/dtos/IClientDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ClientService from '../../../shared/services/ClientService';
import { Form, StyledCard } from './styles';

export function RegisterClient(): JSX.Element {
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

  const { handleSubmit, control, reset } = useForm<IFormClient>({
    resolver: yupResolver(schemaCreateClient),
    defaultValues: {
      name: '',
      phone: '',
      debit: '',
    },
  });

  async function handleSubmitCreate(dataForm: IFormClient) {
    setLoading(true);
    const data: IClientDTO = transformObjectClient(dataForm);

    const clientService = new ClientService();
    try {
      await clientService.create(data);
      displayNotificationMessage(false, 'Cliente cadastrado com sucesso!');
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(true, `Erro ao cadastrar cliente - ${response?.data?.message}`);
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
        titulo="Cadastro cliente"
        navigatePage="/clients"
        textButton="VOLTAR"
        icon="arrow_back"
      >
        <Form noValidate onSubmit={handleSubmit(handleSubmitCreate)}>
          <StyledCard>
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
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
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
                  mask="(99) 99999-9999"
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
