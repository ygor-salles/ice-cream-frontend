import { Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Card } from '@mui/material';
import { api } from '../../shared/services/api';

export function Products(): JSX.Element {

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Caiuu');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const { data } = await api.post('products', {
        name: formData.get('name'),
        price: formData.get('price'),
        description: formData.get('description')
      });
      console.log('DATA', data);
    } catch (error) {
      console.log('FALHA', error);
    }
  };

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <LayoutBaseDePagina
      titulo='Produtos'
    >
      <Container maxWidth="xl">
        <hr color='primary' />
        <Box
          sx={{
            marginTop: 4,
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
                    label="Nome do produto"
                    variant='standard'
                    type={'text'}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="price"
                    required
                    fullWidth
                    id="price"
                    label="Preço"
                    variant='standard'
                    type={'number'}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    fullWidth
                    id="description"
                    label="Descrição"
                    variant='standard'
                    type={'text'}
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
                    sx={{ bgcolor: 'primary' }}
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