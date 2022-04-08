import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import { schemaCreateProduct } from '../../../shared/schemas/productSchema';
import ProductService from '../../../shared/services/ProductService';

interface IFormInputs {
  name: string;
}

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const {
    handleSubmit,
    control,
    // reset,
    // register,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schemaCreateProduct),
  });

  const onSubmit = (data: any) => console.log(data);

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
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, width: '100%' }}
        >
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextFieldApp
                      id="name"
                      name="name"
                      label="Nome do produto"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors.name)}
                      helperText={errors?.name?.message || ''}
                      type="text"
                      required
                    />
                  )}
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
