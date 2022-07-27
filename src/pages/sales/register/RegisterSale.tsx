/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Card, Theme, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LISTCLIENTS } from '../../../assets/mocks/ListClients';
import { LISTPRODUCTS } from '../../../assets/mocks/ListProducts';
import { LISTTYPESALES } from '../../../assets/mocks/ListTypeSales';
import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import SelectApp from '../../../shared/components/select/Select';
import Snackbar from '../../../shared/components/snackBar/SnackBar';
import TextFieldApp from '../../../shared/components/textField/TextField';
import { IProductDTO } from '../../../shared/dtos/IProductDTO';
import {
  IFormSale,
  ISaleDTO,
  schemaCreateSale,
  transformObjectSale,
  EnumTypeSale,
  schemaCreateSaleWithCustomer,
} from '../../../shared/dtos/ISaleDTO';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import SaleService from '../../../shared/services/SaleService';
import formatNumberToCurrencyInput from '../../../shared/utils/formaNumberToCurrencyInput';

export function RegisterSale(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [requiredClient, setRequiredClient] = useState(false);

  const handleCloseAlert = (): void => {
    setOpenToast(false);
  };

  const { handleSubmit, control, setValue } = useForm<IFormSale>({
    resolver: yupResolver(
      requiredClient === false ? schemaCreateSale : schemaCreateSaleWithCustomer,
    ),
    defaultValues: {
      product_id: '',
      type_sale: '',
      client_id: '',
      observation: '',
      total: '',
    },
  });

  const displayNotificationMessage = (error: boolean, message: string): void => {
    setOpenToast(true);
    setError(error);
    setMessage(message);
  };

  const onSubmit = async (dataForm: any) => {
    console.log(requiredClient);
    console.log(dataForm);

    // const data: ISaleDTO = transformObjectSale(dataForm);

    // const saleService = new SaleService();
    // try {
    //   await saleService.create(data);
    //   displayNotificationMessage(false, 'Venda registrada com sucesso!');
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
      <LayoutBaseDePagina
        titulo="Cadastro venda"
        navigatePage="/sales"
        textButton="VENDAS"
        icon="sell"
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: '100%' }}
        >
          <Card sx={{ padding: '20px' }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <SelectApp
                  name="product_id"
                  control={control}
                  array={LISTPRODUCTS}
                  setId
                  label="Produto"
                  required
                  onClose={event => {
                    const product = LISTPRODUCTS.find(
                      product => product.id === Number(event.currentTarget.id),
                    );
                    if (product?.price) {
                      setValue('total', formatNumberToCurrencyInput(product.price));
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectApp
                  name="type_sale"
                  control={control}
                  array={LISTTYPESALES}
                  label="Tipo de venda"
                  required
                  onClose={event => {
                    if (event.currentTarget.id === EnumTypeSale.DEBIT) {
                      setRequiredClient(true);
                    } else {
                      setRequiredClient(false);
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectApp
                  name="client_id"
                  control={control}
                  array={LISTCLIENTS}
                  setId
                  label="Cliente"
                  required={requiredClient}
                />
              </Grid>

              <Grid item xs={12}>
                <TextFieldApp name="observation" control={control} label="Observação" />
              </Grid>

              <Grid item xs={12}>
                <TextFieldApp
                  name="total"
                  control={control}
                  label="Total"
                  InputProps={{
                    inputComponent: NumberFormatCustom as any,
                  }}
                  required
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
