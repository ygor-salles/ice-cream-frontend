import { yupResolver } from '@hookform/resolvers/yup';
import { CircularProgress, Theme, useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
import { Form, StyledCard } from './styles';

export function RegisterProduct(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCloseAlert = () => setOpenToast(false);

  const displayNotificationMessage = (error: boolean, message: string) => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const { handleSubmit, control, reset } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      name: '',
      price: '',
      description: '',
    },
  });

  async function handleSubmitCreate(dataForm: IFormProduct) {
    setLoading(true);
    const data: IProductDTO = transformObject(dataForm);

    const productService = new ProductService();
    try {
      await productService.create(data);
      displayNotificationMessage(false, 'Produto cadastrado com sucesso!');
    } catch (error) {
      const { response } = error as AxiosError;
      displayNotificationMessage(true, `Erro ao cadastrar produto - ${response?.data?.message}`);
    } finally {
      setLoading(false);
      reset();
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
        <Form noValidate onSubmit={handleSubmit(handleSubmitCreate)}>
          <StyledCard>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextFieldApp
                  name="name"
                  control={control}
                  label="Nome do produto"
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="price"
                  control={control}
                  label="Pre??o do produto"
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
                  required
                  disabled={loading}
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldApp
                  name="description"
                  control={control}
                  label="Descri????o do produto"
                  disabled={loading}
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
                  endIcon={
                    loading ? (
                      <CircularProgress variant="indeterminate" color="inherit" size={20} />
                    ) : undefined
                  }
                  disabled={loading}
                >
                  CADASTRAR
                </Button>
              </Grid>
            </Grid>
          </StyledCard>
        </Form>
      </LayoutBaseDePagina>
    </>
  );
}
