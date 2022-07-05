import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import {
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
  transformObject,
} from '../../../shared/dtos/IProductDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import ProductService from '../../../shared/services/ProductService';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const { handleSubmit, control } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
  });

  async function handleSubmitCreate(dataForm: IFormProduct) {
    const data: IProductDTO = transformObject(dataForm);

    const productService = new ProductService();
    try {
      await productService.create(data);
      displayNotificationMessage(false, 'Produto atualizado com sucesso!');
    } catch (error) {
      // const { response } = error as AxiosError;
      displayNotificationMessage(false, 'Produto atualizado com sucesso!');
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
        titulo="Cadastro produto"
        navigatePage="/products"
        textButton="VOLTAR"
        icon="arrow_back"
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleSubmitCreate)}
          sx={{ mt: 1, width: '100%' }}
        >
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      label="Nome do produto"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      label="Preço do produto"
                      value={value}
                      onChange={onChange}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                      }}
                      error={!!error}
                      helperText={error ? error.message : null}
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      label="Descrição do produto"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
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
                  sx={{
                    bgcolor: 'primary',
                    padding: smDown ? '10px' : 'auto',
                    fontSize: smDown ? '1rem' : 'auto',
                  }}
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
