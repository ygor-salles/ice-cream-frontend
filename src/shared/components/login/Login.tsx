import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useAuthContext } from '../../contexts';
import { IFormLogin, schemaLogin } from '../../dtos/ILoginDTO';
import Snackbar from '../snackBar/SnackBar';
import TextFieldApp from '../textField/TextField';

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const { handleSubmit, control } = useForm<IFormLogin>({
    resolver: yupResolver(schemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const onSubmit = async ({ email, password }: IFormLogin) => {
    setIsLoading(true);

    login(email, password)
      .then(() => setIsLoading(false))
      .catch(err =>
        displayNotificationMessage(true, 'Erro ao efetuar login, verfique as credenciais'),
      )
      .finally(() => setIsLoading(false));
  };

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (isAuthenticated) return <>{children}</>;

  return (
    <>
      <Snackbar
        open={openToast && !isAuthenticated}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Card>
          <CardContent>
            <Box
              component="form"
              noValidate
              display="flex"
              flexDirection="column"
              gap={2}
              width={250}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography variant="h6" align="center">
                Login
              </Typography>

              <Grid item>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      label="E-mail"
                      type="email"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      required
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>

              <Grid item sx={{ mt: 2, mb: 2 }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      label="Senha"
                      type="password"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      required
                      disabled={isLoading}
                    />
                  )}
                />
              </Grid>

              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                endIcon={
                  isLoading ? (
                    <CircularProgress variant="indeterminate" color="inherit" size={20} />
                  ) : undefined
                }
              >
                Entrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
