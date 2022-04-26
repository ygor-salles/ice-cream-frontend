import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';

import { NumberFormatCustom } from '../../../shared/components';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import {
  IFormProduct,
  IProductDTO,
  schemaCreateProduct,
  transformObject,
} from '../../../shared/dtos/IProductDTO';
import ProductService from '../../../shared/services/ProductService';

interface DialogEditProps {
  name: string;
  price: string;
  description?: string;
  smDown?: boolean;
  open: boolean;
  handleClose: () => void;
}

const StyledButton = styled(Button)(() => ({
  backgroundColor: '#ffffff',
  '&:hover': {
    backgroundColor: '#ffffff',
  },
}));

export function DialogEdit({
  name,
  price,
  description,
  smDown,
  open,
  handleClose,
}: DialogEditProps): JSX.Element {
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const { handleSubmit, control } = useForm<IFormProduct>({
    resolver: yupResolver(schemaCreateProduct),
    defaultValues: {
      name,
      price,
      description,
    },
  });

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const onSubmit = async (dataForm: IFormProduct) => {
    console.log(dataForm);

    // const data: IProductDTO = transformObject(dataForm);

    // const productService = new ProductService();
    // try {
    //   const response = await productService.updateById(data);
    //   displayNotificationMessage(false, 'Produto cadastrado com sucesso!');
    // } catch (error) {
    //   // const { response } = error as AxiosError;
    //   displayNotificationMessage(true, 'Error ao cadastrar o produto!');
    // }
  };

  return (
    <>
      <Snackbar
        open={openToast}
        onCloseAlert={handleCloseAlert}
        onCloseSnack={handleCloseAlert}
        message={message}
        severity={error ? 'error' : 'success'}
      />
      <Dialog
        fullScreen={smDown}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ width: '100%', height: smDown ? '100vh' : 'auto', display: 'contents' }}
        >
          <DialogTitle id="responsive-dialog-title">EDITAR PRODUTO</DialogTitle>
          <DialogContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextFieldApp
                      name="name"
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
                      name="price"
                      id="price"
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
                      name="description"
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
          </DialogContent>
          <DialogActions style={{ justifyContent: 'space-between' }}>
            <StyledButton variant="outlined" onClick={handleClose}>
              CANCELAR
            </StyledButton>
            <Button variant="contained" type="submit">
              EDITAR
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
