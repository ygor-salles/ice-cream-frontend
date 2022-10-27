/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import ButtonSubmitApp from '../../../shared/components/button/ButtonSubmitApp';
import { NumberFormatCustom } from '../../../shared/components/number-format-custom/NumberFormatCustom';
import SelectApp from '../../../shared/components/select/Select';
import TextFieldApp from '../../../shared/components/textField/TextField';
import TextFieldCount from '../../../shared/components/textFieldCount/TextFieldCount';
import { LISTTYPESALES } from '../../../shared/constants/listTypeSales';
import {
  EnumTypeSale,
  IFormSale,
  schemaCreateSale,
  schemaCreateSaleWithCustomer,
} from '../../../shared/dtos/ISaleDTO';
import { useClient } from '../../../shared/hooks/network/useClient';
import { useProduct } from '../../../shared/hooks/network/useProduct';
import { useSale } from '../../../shared/hooks/network/useSale';
import { LayoutBaseDePagina } from '../../../shared/layouts';
import formatNumberToCurrencyInput from '../../../shared/utils/formaNumberToCurrencyInput';
import { Form, GridForm, StyledCard } from './styles';

export function RegisterSale(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [requiredClient, setRequiredClient] = useState(false);

  const defaultValueAmount = '1';
  const { handleSubmit, control, setValue, reset, getValues } = useForm<IFormSale>({
    resolver: yupResolver(
      requiredClient === false ? schemaCreateSale : schemaCreateSaleWithCustomer,
    ),
    defaultValues: {
      product_id: '',
      type_sale: '',
      client_id: '',
      observation: '',
      amount: defaultValueAmount,
      total: '',
    },
  });

  const { handleSubmitCreate, loadingForm: loading } = useSale();

  const { getProducts, allProducts, loadingProducts } = useProduct();

  const { getClients, allClients, loadingClients } = useClient();

  const unitPrice = useRef<number>(null);
  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);

  useEffect(() => {
    getProducts(true);
    getClients();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro venda"
      navigatePage="/sales"
      textButton="VENDAS"
      icon="sell"
    >
      {loadingProducts || loadingClients ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Form
          noValidate
          onSubmit={handleSubmit((data: IFormSale) => {
            handleSubmitCreate(data, reset);
            setValue('amount', defaultValueAmount);
            setIsDisabledTextFieldCount(true);
          })}
        >
          <StyledCard>
            <GridForm>
              <SelectApp
                name="product_id"
                control={control}
                array={allProducts}
                setId
                label="Produto"
                required
                onClose={event => {
                  const product = allProducts.find(
                    product => product.id === Number(event.currentTarget.id),
                  );
                  if (product?.price) {
                    unitPrice.current = product.price;
                    setValue('total', formatNumberToCurrencyInput(product.price));
                    setIsDisabledTextFieldCount(false);
                  }
                }}
                disabled={loading}
              />
              <TextFieldCount
                name="amount"
                control={control}
                label="Quantidade"
                defaultValue={Number(defaultValueAmount)}
                handleOperation={() => {
                  setValue(
                    'total',
                    formatNumberToCurrencyInput(Number(getValues('amount')) * unitPrice.current),
                  );
                }}
                disabled={loading || isDisabledTextFieldCount}
              />
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
                disabled={loading}
              />
              <SelectApp
                name="client_id"
                control={control}
                array={allClients}
                setId
                label="Cliente"
                required={requiredClient}
                disabled={loading}
              />
              <TextFieldApp name="observation" control={control} label="Observação" />
              <TextFieldApp
                name="total"
                control={control}
                label="Total"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                required
                disabled={loading}
              />
            </GridForm>

            <ButtonSubmitApp loading={loading} smDown={smDown} textButton="CADASTRAR" />
          </StyledCard>
        </Form>
      )}
    </LayoutBaseDePagina>
  );
}
