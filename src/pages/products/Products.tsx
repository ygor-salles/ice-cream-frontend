import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { Theme, useMediaQuery } from '@mui/material';
import { MyCard } from './styles';
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
            <MyCard sx={{ padding: '20px' }} >
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
                    sx={{ bgcolor: 'primary.light' }}
                  >
                  CADASTRAR
                  </Button>
                </Grid>
              </Grid>
            </MyCard>
          </Box>
        </Box>
      </Container>
    </LayoutBaseDePagina>
  );
}