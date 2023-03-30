/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Button, Dialog, Theme, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import AutoComplete from 'shared/components/autocomplete/Autocomplete';
import SelectMultiple from 'shared/components/selectMultiple/SelectMultiple';
import TextFieldApp from 'shared/components/textField/TextField';
import TextFieldCount from 'shared/components/textFieldCount/TextFieldCount';
import { localStorageKeys } from 'shared/constants/localStorageKeys';
import { EnumTypeProduct } from 'shared/dtos/IProductDTO';
import {
  defaultValueAmount,
  defaultValuesDialogSale,
  fieldsSale,
  IFormSale,
  schemaDialogCreateSale,
} from 'shared/dtos/ISaleDTO';
import { useCache } from 'shared/hooks/useCache';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import Mask from 'shared/utils/masks';

import { Form, GridForm, WrapperButtons, HeaderDialog } from './styles';

interface PropTypes {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IFormSale) => void;
}

const DialogCreateSale: React.FC<PropTypes> = ({ open, onClose, onSubmit }) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, setValue, reset, getValues } = useForm<IFormSale>({
    resolver: yupResolver(schemaDialogCreateSale),
    defaultValues: defaultValuesDialogSale,
  });

  const { getDataLocalStorage } = useCache();

  const allProducts = useMemo(() => {
    return getDataLocalStorage(localStorageKeys.PRODUCTS);
  }, []);

  const allCombinations = useMemo(() => {
    return getDataLocalStorage(localStorageKeys.COMBINATIONS);
  }, []);

  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);
  const [count, setCount] = useState(Number(defaultValueAmount));
  const [enableOptions, setEnableOptions] = useState(false);

  const handleClose = useCallback(() => {
    setCount(Number(defaultValueAmount));
    setIsDisabledTextFieldCount(true);
    reset();
    onClose();
  }, [open]);

  const onCloseSelectProduct = async (_: any) => {
    const product_name = getValues('product_name');

    if (product_name?.length > 0) {
      const product = allProducts.find(item => item.name === product_name);

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

  const onCloseSelectCombinations = (_: any) => {
    const optionsCombinations = getValues('combinations');
    const priceProduct = getValues('data_product.price');

    let soma = optionsCombinations.reduce((acumulator, { price }) => acumulator + price, 0);
    soma += priceProduct;

    setValue('total', formatNumberToCurrencyInput(soma));
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

  return (
    <Dialog fullScreen={smDown} open={open} onClose={onClose}>
      <HeaderDialog>
        <Typography color="white">Inserir venda</Typography>
        <Button
          type="button"
          color="info"
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={handleClose}
        >
          Voltar
        </Button>
      </HeaderDialog>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <GridForm>
          <AutoComplete
            name={fieldsSale.PRODUCT_NAME}
            control={control}
            options={allProducts}
            sortAlphabeticallyObject
            label="Produto"
            required
            onClose={onCloseSelectProduct}
          />
          {enableOptions && (
            <SelectMultiple
              name={fieldsSale.COMBINATIONS}
              control={control}
              options={allCombinations}
              sortAlphabeticallyObject
              label="Combinações"
              setValue={setValue}
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
            disabled={isDisabledTextFieldCount}
          />
          <TextFieldApp name={fieldsSale.TOTAL} control={control} label="Total" currency required />
        </GridForm>

        <WrapperButtons>
          <Button type="button" color="secondary" variant="outlined" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained">
            INSERIR
          </Button>
        </WrapperButtons>
      </Form>
    </Dialog>
  );
};

export default DialogCreateSale;
