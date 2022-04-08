import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useState } from 'react';

import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { schemaCreateProduct } from '../../../shared/schemas/productSchema';
import ProductService from '../../../shared/services/ProductService';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
    },
    validationSchema: schemaCreateProduct,
    onSubmit: values => {
      console.log(values);
    },
  });

  // const displayNotificationMessage = (error: boolean, message: string): void => {
  //   setOpenToast(true);
  //   setError(error);
  //   setMessage(message);
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const productService = new ProductService();

  //   try {
  //     await productService.create({
  //       name: String(formData.get('name')),
  //       price: Number(formData.get('price')),
  //       description: String(formData.get('description')),
  //     });
  //     displayNotificationMessage(false, 'Produto cadastrado com sucesso!');
  //   } catch (error) {
  //     // const { response } = error as AxiosError;
  //     displayNotificationMessage(true, 'Error ao cadastrar o produto!');
  //   }
  // };

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
        titulo="Cadastro produto"
        navigatePage="/products"
        textButton="VOLTAR"
        icon="arrow_back"
      >
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 3, width: '100%' }}
        >
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextFieldApp
                  id="name"
                  name="name"
                  label="Nome do produto"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  id="price"
                  name="price"
                  label="Preço"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  id="description"
                  name="description"
                  label="Descrição"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  type="text"
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
