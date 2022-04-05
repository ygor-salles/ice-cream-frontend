import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

import SnackBar from '../../../shared/components/SnackBar';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ProductService from '../../../shared/services/ProductService';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const productService = new ProductService();

    try {
      await productService.create({
        name: String(formData.get('name')),
        price: Number(formData.get('price')),
        description: String(formData.get('description')),
      });
      displayNotificationMessage(false, 'Produto cadastrado com sucesso!');
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(true, 'Error ao cadastrar o produto!');
    }
  };

  return (
    <>
      <SnackBar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />
      <LayoutBaseDePagina
        titulo="Cadastro produto"
        navigatePage="/products"
        textButton="VOLTAR"
        icon="arrow_back"
      >
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome do produto"
                  variant="standard"
                  type="text"
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
                  variant="standard"
                  type="number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  fullWidth
                  id="description"
                  label="Descrição"
                  variant="standard"
                  type="text"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 6 }}>
              <Grid item display="flex" justifyContent="flex-end" width="100%">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={!!smDown}
                  sx={{ bgcolor: 'primary' }}
                >
                  CADASTRAR
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </LayoutBaseDePagina>
    </>
  );
}
