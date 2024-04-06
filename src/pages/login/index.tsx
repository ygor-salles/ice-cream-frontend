import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Card, CardContent, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants';
import { defaultValuesLogin, fieldsLogin, IFormLogin, schemaLogin } from 'shared/dtos/ILoginDTO';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import { TextFieldApp } from '../../shared/components';
import { Container, Form } from './styles';

export const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control } = useForm<IFormLogin>({
    resolver: yupResolver(schemaLogin),
    defaultValues: defaultValuesLogin,
  });

  const onSubmit = async ({ email, password }: IFormLogin) => {
    setLoading(true);
    try {
      const response = await authenticate(email, password);
      setLoading(false);

      if (response?.role === EnumRoleUser.NORMAL) {
        navigate(RoutesEnum.ORDERS_ACTIVES);
      } else {
        navigate(RoutesEnum.SALES_CREATE);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container>
      <Card>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" align="center">
              Login
            </Typography>

            <Grid item>
              <TextFieldApp
                name={fieldsLogin.EMAIL}
                control={control}
                label="E-mail"
                type="email"
                required
                disabled={loading}
              />
            </Grid>

            <Grid item sx={{ mt: 2, mb: 2 }}>
              <TextFieldApp
                name={fieldsLogin.PASSWORD}
                control={control}
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={loading}
                renderRight={
                  <IconButton onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
              />
            </Grid>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              endIcon={
                loading ? (
                  <CircularProgress variant="indeterminate" color="inherit" size={20} />
                ) : undefined
              }
            >
              Entrar
            </Button>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};
