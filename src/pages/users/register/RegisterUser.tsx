import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import {
  EnumRoleUser,
  IFormUser,
  IUserDTO,
  schemaCreateUser,
  transformObjectUser,
} from '../../../shared/dtos/IUserDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import UserService from '../../../shared/services/UserService';
import { Form, StyledCard } from './styles';

export function RegisterUser(): JSX.Element {
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

  const { handleSubmit, control, reset } = useForm<IFormUser>({
    resolver: yupResolver(schemaCreateUser),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: EnumRoleUser.NORMAL,
    },
  });

  async function handleSubmitCreate(dataForm: IFormUser) {
    setLoading(true);
    const data: IUserDTO = transformObjectUser(dataForm);

    const userService = new UserService();
    try {
      await userService.create(data);
      displayNotificationMessage(false, 'Usuário cadastrado com sucesso!');
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(true, `Erro ao cadastrar usuário - ${response?.data?.message}`);
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
        titulo="Cadastro usuário"
        navigatePage="/users"
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
                  label="Nome"
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="email"
                  control={control}
                  label="E-mail"
                  type="email"
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="password"
                  control={control}
                  label="Senha"
                  type="password"
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp name="role" control={control} label="Acesso" disabled={loading} />
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
