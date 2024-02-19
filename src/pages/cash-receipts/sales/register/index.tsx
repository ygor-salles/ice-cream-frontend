import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack, AttachMoney } from '@mui/icons-material';
import { Button, Skeleton } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  AutoComplete,
  SelectApp,
  SelectMultiple,
  TextFieldApp,
  TextFieldCount,
} from 'shared/components';
import { LISTTYPESALES } from 'shared/constants/listTypeSales';
import { RoutesEnum } from 'shared/constants/routesList';
import { ICombinationDTO } from 'shared/dtos/ICombinationDTO';
import { EnumTypeProduct, IProductDTO } from 'shared/dtos/IProductDTO';
import {
  EnumTypeSale,
  IFormSale,
  defaultValueAmount,
  defaultValuesSale,
  fieldsSale,
  schemaCreateSale,
  schemaCreateSaleWithCustomer,
  transformItemArray,
  transformObject,
} from 'shared/dtos/ISaleDTO';
import { useSale } from 'shared/hooks/network/useSale';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';
import { LayoutBaseDePagina } from 'shared/layouts';
import { IDataProduct } from 'shared/services/SaleService/dtos/ICreateSaleDTO';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import Mask from 'shared/utils/masks';

import { CartListing } from './components/CartListing';
import { Form, GridForm, Notificaion, StyledCard, Text, Wrapper, WrapperButtons } from './styles';

export function RegisterSale() {
  const [requiredClient, setRequiredClient] = useState(false);
  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);
  const [count, setCount] = useState(Number(defaultValueAmount));
  const [enableOptions, setEnableOptions] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<IFormSale>({
    resolver: yupResolver(
      requiredClient === false ? schemaCreateSale : schemaCreateSaleWithCustomer,
    ),
    defaultValues: defaultValuesSale,
  });

  const {
    allClientsStorage: allCli,
    allCombinationsStorage,
    allProductsStorage: allProd,
    handleUpdateStorageData,
    loadingStorage,
  } = useDrawerContext();
  const allProductsStorage = allProd ? allProd.filter(item => item.status) : [];
  const allClientsStorage = allCli ?? [];

  const { handleSubmitCreate, loadingForm: loading } = useSale();

  const [allCombinations, setAllCombinations] = useState<ICombinationDTO[]>(
    allCombinationsStorage ?? [],
  );

  const [showScreenCarListing, setShowScreenCarListing] = useState(false);
  const onToggleScreenCarListing = () => setShowScreenCarListing(prev => !prev);
  const [carListState, setCarListState] = useState<IDataProduct[]>([]);

  const totalSum = useMemo(() => {
    if (carListState?.length > 0) {
      return carListState.reduce((acumulator, current) => acumulator + current.total, 0);
    }
    return 0;
  }, [carListState]);

  const onSubmitInsert = useCallback((data: IFormSale) => {
    const newItem: IDataProduct = transformItemArray(data);
    setCarListState(prev => [...prev, newItem]);
    setIsDisabledTextFieldCount(true);
    onToggleScreenCarListing();
    setTimeout(() => {
      setValue('combinations', []);
      setValue('amount', defaultValueAmount);
      setCount(Number(defaultValueAmount));
    }, 1000);
  }, []);

  const onDeleteList = useCallback(
    (object: IDataProduct) => {
      const newList = carListState.filter(item => item !== object);
      setCarListState(newList);
    },
    [carListState],
  );

  const onSubmit = async () => {
    await handleSubmitCreate(
      transformObject({
        total: totalSum,
        type_sale: getValues('type_sale'),
        observation: getValues('observation'),
        client_id: getValues('client_id'),
        data_product: carListState,
      }),
    );
    setRequiredClient(false);
    reset();
    setCarListState([]);
    onToggleScreenCarListing();
  };

  const ruleAcais = (product: IProductDTO) => {
    if (product.name.includes('200')) {
      setAllCombinations(allCombinations.map(item => ({ ...item, price: 3 })));
    } else if (product.name.includes(' 1L') || product.name.includes(' 1 L')) {
      setAllCombinations(allCombinations.map(item => ({ ...item, price: item.price + 1 })));
    } else {
      setAllCombinations(allCombinationsStorage);
    }
  };

  const onCloseSelectProduct = async () => {
    const product_name = getValues('product_name');

    if (product_name?.length > 0) {
      if (getValues('combinations').length > 0) setValue('combinations', []);

      const product = allProductsStorage.find(item => item.name === product_name);

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
          ruleAcais(product);
          setEnableOptions(true);
        } else {
          setEnableOptions(false);
        }
        setIsDisabledTextFieldCount(false);
      }
    } else {
      setCount(Number(defaultValueAmount));
      setValue('total', '');
      setAllCombinations(allCombinationsStorage);
      setEnableOptions(false);
      setIsDisabledTextFieldCount(true);
    }
  };

  const onCloseSelectClient = () => {
    const client_name = getValues('client_name');

    if (client_name?.length > 0) {
      const client = allClientsStorage.find(item => item.name === client_name);
      setValue('client_id', client.id.toString());
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

  const onCloseSelectCombinations = () => {
    const optionsCombinations = getValues('combinations');
    const priceProduct = getValues('data_product.price');
    const amount = Number(getValues('amount'));

    let soma = optionsCombinations.reduce((acumulator, { price }) => acumulator + price, 0);
    soma += priceProduct;

    setValue('total', formatNumberToCurrencyInput(soma * amount));
  };

  const getDataStorage = async () => {
    await handleUpdateStorageData();
  };

  useEffect(() => {
    if (allCombinationsStorage) {
      setAllCombinations(allCombinationsStorage);
    } else {
      getDataStorage();
    }
  }, [allCombinationsStorage]);

  return (
    <LayoutBaseDePagina
      titulo="Cadastro venda"
      onClick={showScreenCarListing ? () => setShowScreenCarListing(false) : undefined}
      navigatePage={!showScreenCarListing ? RoutesEnum.SALES : undefined}
      textButton={showScreenCarListing ? 'Voltar' : 'VENDAS'}
      icon={showScreenCarListing ? <ArrowBack /> : <AttachMoney />}
      disabled={loading}
    >
      {loadingStorage ? (
        <Skeleton variant="rectangular" width="100%" height={450} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmitInsert)}>
          {!showScreenCarListing ? (
            <Wrapper style={{ position: 'relative' }}>
              {carListState.length > 0 && <Notificaion>{carListState.length}</Notificaion>}
              <StyledCard>
                <GridForm>
                  <AutoComplete
                    name={fieldsSale.PRODUCT_NAME}
                    control={control}
                    options={allProductsStorage}
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
                      sortAlphabeticallyObject
                      label="Combinações"
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
                  <AutoComplete
                    name={fieldsSale.CLIENT_NAME}
                    control={control}
                    options={allClientsStorage}
                    sortAlphabeticallyObject
                    label="Cliente"
                    onClose={onCloseSelectClient}
                    required={requiredClient}
                    disabled={
                      loading || (carListState.length >= 1 && getValues('client_name').length > 0)
                    }
                  />
                  <TextFieldApp
                    name={fieldsSale.OBSERVATION}
                    control={control}
                    label="Observação"
                  />
                  <TextFieldApp
                    name={fieldsSale.TOTAL}
                    control={control}
                    label="Total"
                    currency
                    required
                    disabled={loading}
                  />
                </GridForm>

                <WrapperButtons>
                  <Button
                    type="button"
                    color="secondary"
                    variant="outlined"
                    onClick={onToggleScreenCarListing}
                  >
                    Visualizar pedidos
                  </Button>
                  <Button type="submit" variant="contained">
                    INSERIR
                  </Button>
                </WrapperButtons>
              </StyledCard>
            </Wrapper>
          ) : (
            <CartListing
              listSale={carListState}
              totalSum={totalSum}
              observation={getValues('observation')}
              type_sale={getValues('type_sale')}
              onDeleteList={onDeleteList}
              onClickPrimary={() => {
                setValue('product_name', '');
                setValue('data_product', null);
                setValue('total', '');
                onToggleScreenCarListing();
              }}
              onClickSeconadary={onSubmit}
              textPrimary="Inserir mais"
              textSecondary="Finalizar pedido"
              loading={loading}
              renderMain={
                !!getValues('client_name') && (
                  <Text>
                    <b>Cliente: </b>
                    {getValues('client_name')}
                  </Text>
                )
              }
              disabledSecondary={!isValid || !carListState.length}
            />
          )}
        </Form>
      )}
    </LayoutBaseDePagina>
  );
}
