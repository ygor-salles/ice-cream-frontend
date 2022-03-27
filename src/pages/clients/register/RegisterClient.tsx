import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { api } from '../../../shared/services/api';

export function RegisterClient(): JSX.Element {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await api.post('clients', {
        name: formData.get('name'),
        phone: formData.get('phone'),
        debit: Number(formData.get('debit')),
      });
      console.log(data);

    } catch (error) {
      console.log('FALHA', error);
    }
  };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <LayoutBaseDePagina
      titulo="Cadastro cliente"
      navigatePage="/clients"
      textButton="VOLTAR"
      icon="arrow_back"
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
            <Card sx={{ padding: '20px' }} >
              <Grid container spacing={5} >
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nome do cliente"
                    variant='standard'
                    type={'text'}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phone"
                    required
                    fullWidth
                    id="phone"
                    label="Telefone de contato"
                    variant='standard'
                    type={'text'}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="debit"
                    fullWidth
                    id="debit"
                    label="Débito"
                    variant='standard'
                    type={'number'}
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ mt: 6 }} >
                <Grid item display="flex" justifyContent="flex-end" width="100%">
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth={smDown ? true : false}
                    sx={{ bgcolor: 'primary.light' }}
                  >
                  CADASTRAR
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Box>
        </Box>
      </Container>
    </LayoutBaseDePagina>
  );
}