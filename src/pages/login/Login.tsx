import { yupResolver } from '@hookform/resolvers/yup';
import { Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from 'shared/constants/routesList';
import { defaultValuesLogin, fieldsLogin, IFormLogin, schemaLogin } from 'shared/dtos/ILoginDTO';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';
import { useLogin } from 'shared/hooks/network/useLogin';
import { useAuthContext } from 'shared/hooks/useAuthContext';

import TextFieldApp from '../../shared/components/textField/TextField';
import { Container, Form } from './styles';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuthContext();
  const { loading } = useLogin();

  const { handleSubmit, control } = useForm<IFormLogin>({
    resolver: yupResolver(schemaLogin),
    defaultValues: defaultValuesLogin,
  });

  const onSubmit = async ({ email, password }: IFormLogin) => {
    const response = await authenticate(email, password);

    if (response.role === EnumRoleUser.NORMAL) {
      navigate(RoutesEnum.ACAIS_ACTIVES);
    } else {
      navigate(RoutesEnum.SALES_CREATE);
    }
  };

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
                type="password"
                required
                disabled={loading}
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
