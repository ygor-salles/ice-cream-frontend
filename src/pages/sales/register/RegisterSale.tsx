/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from '@hookform/resolvers/yup';
import { AttachMoney } from '@mui/icons-material';
import { Skeleton, Theme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ButtonSubmitApp from 'shared/components/button/ButtonSubmitApp';
import SelectApp from 'shared/components/select/Select';
import SelectMultiple from 'shared/components/selectMultiple/SelectMultiple';
import TextFieldApp from 'shared/components/textField/TextField';
import TextFieldCount from 'shared/components/textFieldCount/TextFieldCount';
import { LISTTYPESALES } from 'shared/constants/listTypeSales';
import Mask from 'shared/constants/masks';
import { RoutesEnum } from 'shared/constants/routesList';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import {
  defaultValueAmount,
  defaultValuesSale,
  EnumTypeSale,
  fieldsSale,
  IFormSale,
  schemaCreateSale,
  schemaCreateSaleWithCustomer,
} from 'shared/dtos/ISaleDTO';
import { useClient } from 'shared/hooks/network/useClient';
import { useCombination } from 'shared/hooks/network/useCombination';
import { useProduct } from 'shared/hooks/network/useProduct';
import { useSale } from 'shared/hooks/network/useSale';
import { LayoutBaseDePagina } from 'shared/layouts';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';

import { Form, GridForm, StyledCard } from './styles';

export function RegisterSale(): JSX.Element {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [requiredClient, setRequiredClient] = useState(false);

  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);
  const [count, setCount] = useState(Number(defaultValueAmount));

  const [enableOptions, setEnableOptions] = useState(false);

  const { handleSubmit, control, setValue, reset, getValues } = useForm<IFormSale>({
    resolver: yupResolver(
      requiredClient === false ? schemaCreateSale : schemaCreateSaleWithCustomer,
    ),
    defaultValues: defaultValuesSale,
  });

  const { handleSubmitCreate, loadingForm: loading } = useSale();

  const { getProducts, allProducts, loadingProducts } = useProduct();

  const { getClients, allClients, loadingClients } = useClient();

  const { getCombinations, allCombinations, loadingCombinations } = useCombination();

  const onSubmitCreate = (data: IFormSale) => {
    const dataSubmit = { ...data };
    dataSubmit.data_product.combinations = data.combinations;
    handleSubmitCreate(dataSubmit, reset);
    setIsDisabledTextFieldCount(true);
    setTimeout(() => {
      setValue('amount', defaultValueAmount);
      setCount(Number(defaultValueAmount));
    }, 1000);
  };

  const onCloseSelectProduct = async (event: React.SyntheticEvent<Element, Event>) => {
    if (event.currentTarget.id) {
      const product = allProducts.find(product => product.id === Number(event.currentTarget.id));

      if (product) {
        setValue('data_product', product);
      }

      if (product?.price) {
        if (product?.price < 0.1 && product?.type === EnumTypeProduct.ICE_CREAM) {
          setValue('total', '');
          setValue('amount', defaultValueAmount);
          setCount(Number(defaultValueAmount));
        } else {
          setValue('total', formatNumberToCurrencyInput(product.price));
        }

        if (product.type === EnumTypeProduct.ACAI) {
          await getCombinations();
          setEnableOptions(true);
        } else {
          setEnableOptions(false);
        }
        setIsDisabledTextFieldCount(false);
      }
    } else {
      setCount(Number(defaultValueAmount));
      setValue('total', '');
      setIsDisabledTextFieldCount(true);
    }
  };

  const handleTextFieldCount = (onClick: 'add' | 'subt') => {
    const { price, type } = getValues('data_product');
    const combinations = getValues('combinations');

    if (type === EnumTypeProduct.ACAI && combinations.length > 0) {
      const totalInput = Mask.convertCurrency(getValues('total'));
      const sumCombinations = combinations.reduce(
        (acumulator, value) => acumulator + value.price,
        0,
      );

      const current = price + sumCombinations;
      setValue(
        'total',
        formatNumberToCurrencyInput(
          onClick === 'add' ? totalInput + current : totalInput - current,
        ),
      );
    } else {
      setValue('total', formatNumberToCurrencyInput(Number(getValues('amount')) * price));
    }
  };

  const onCloseSelectSale = (event: React.SyntheticEvent<Element, Event>) => {
    if (event.currentTarget.id === EnumTypeSale.DEBIT) {
      setRequiredClient(true);
    } else {
      setRequiredClient(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onCloseSelectCombinations = (event: React.SyntheticEvent<Element, Event>) => {
    const optionsCombinations = getValues('combinations');
    const priceProduct = getValues('data_product.price');

    let soma = optionsCombinations.reduce((acumulator, { price }) => acumulator + price, 0);
    soma += priceProduct;

    setValue('total', formatNumberToCurrencyInput(soma));
  };

  useEffect(() => {
    getProducts(true);
    getClients();
  }, []);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro venda"
      navigatePage={RoutesEnum.SALES}
      textButton="VENDAS"
      icon={<AttachMoney />}
    >
      {loadingProducts || loadingClients || loadingCombinations ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Form noValidate onSubmit={handleSubmit((data: IFormSale) => onSubmitCreate(data))}>
          <StyledCard>
            <GridForm>
              <SelectApp
                name={fieldsSale.PRODUCT_ID}
                control={control}
                options={allProducts}
                setId
                sortAlphabeticallyObject
                label="Produto"
                required
                onClose={onCloseSelectProduct}
                disabled={loading}
              />
              {enableOptions && (
                <SelectMultiple
                  name={fieldsSale.COMBINATIONS}
                  control={control}
                  options={allCombinations}
                  label="Combinações"
                  setValue={setValue}
                  disabled={loading}
                  onClose={onCloseSelectCombinations}
                />
              )}
              <TextFieldCount
                name={fieldsSale.AMOUNT}
                control={control}
                label="Quantidade"
                defaultValue={Number(defaultValueAmount)}
                stateCount={count}
                setStateCount={setCount}
                handleOperation={handleTextFieldCount}
                disabled={loading || isDisabledTextFieldCount}
              />
              <SelectApp
                name={fieldsSale.TYPE_SALE}
                control={control}
                options={LISTTYPESALES}
                label="Tipo de venda"
                required
                onClose={onCloseSelectSale}
                disabled={loading}
              />
              <SelectApp
                name={fieldsSale.CLIENT_ID}
                control={control}
                options={allClients}
                setId
                sortAlphabeticallyObject
                label="Cliente"
                required={requiredClient}
                disabled={loading}
              />
              <TextFieldApp name={fieldsSale.OBSERVATION} control={control} label="Observação" />
              <TextFieldApp
                name={fieldsSale.TOTAL}
                control={control}
                label="Total"
                currency
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
