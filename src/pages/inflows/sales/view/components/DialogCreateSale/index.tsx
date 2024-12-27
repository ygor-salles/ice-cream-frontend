import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Button, Dialog, Theme, Typography, useMediaQuery } from '@mui/material';
import {
  defaultValueAmount,
  defaultValuesDialogSale,
  fieldsSale,
  schemaDialogCreateSale,
} from 'pages/inflows/sales/utils';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoComplete, SelectMultiple, TextFieldApp, TextFieldCount } from 'shared/components';
import { TypeEventFieldCount } from 'shared/components/TextFieldCount/types';
import { ICombinationDTO, EnumTypeProduct, IFormSale } from 'shared/dtos';
import { useDrawerContext } from 'shared/hooks';
import { formatNumberToCurrencyInput } from 'shared/utils';
import Mask from 'shared/utils/masks';
import { ruleAcais } from 'shared/utils/rulesAcais';

import { Form, GridForm, HeaderDialog, WrapperButtons } from './styles';
import { DialogCreateSaleProps } from './types';

export const DialogCreateSale = ({ open, onClose, onSubmit }: DialogCreateSaleProps) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const { handleSubmit, control, setValue, reset, getValues, watch } = useForm<IFormSale>({
    resolver: yupResolver(schemaDialogCreateSale),
    defaultValues: defaultValuesDialogSale,
  });

  const amount = watch('amount');

  const { allProductsStorage: allProd, allCombinationsStorage: allComb } = useDrawerContext();
  const allProductsStorage = allProd ? allProd.filter(item => item.status) : [];
  const allCombinationsStorage = allComb ?? [];

  const [allCombinations, setAllCombinations] = useState<ICombinationDTO[]>(allCombinationsStorage);
  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);
  const [enableOptions, setEnableOptions] = useState(false);

  const handleClose = useCallback(() => {
    setValue('amount', defaultValueAmount);
    setIsDisabledTextFieldCount(true);
    reset();
    onClose();
  }, [open]);

  const onCloseSelectProduct = async () => {
    const product_name = getValues('product_name');
    setValue('amount', defaultValueAmount);

    if (product_name?.length > 0) {
      if (getValues('combinations').length > 0) setValue('combinations', []);

      const product = allProductsStorage.find(item => item.name === product_name);

      if (product) {
        setValue('data_product', product);
      }

      if (product?.price) {
        if (product?.price < 0.1 && product?.type === EnumTypeProduct.ICE_CREAM) {
          setEnableOptions(false);
          setIsDisabledTextFieldCount(true);
          setValue('total', '');
          return;
        }

        if (product.type === EnumTypeProduct.ACAI) {
          ruleAcais({ product, allCombinationsStorage, setAllCombinations });
          setEnableOptions(true);
          setIsDisabledTextFieldCount(false);
          setValue('total', formatNumberToCurrencyInput(product.price));
          return;
        }

        setEnableOptions(false);
        setIsDisabledTextFieldCount(false);
        setValue('total', formatNumberToCurrencyInput(product.price));
      }
    } else {
      setAllCombinations(allCombinationsStorage ?? []);
      setIsDisabledTextFieldCount(true);
      setEnableOptions(false);
      setValue('total', '');
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

  const handleTextFieldCount = (onClick: TypeEventFieldCount) => {
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
      <Form
        onSubmit={handleSubmit((data: IFormSale) => {
          onSubmit(data);
          handleClose();
        })}
      >
        <GridForm>
          <AutoComplete
            name={fieldsSale.PRODUCT_NAME}
            control={control}
            options={allProductsStorage}
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
              onClose={onCloseSelectCombinations}
            />
          )}
          <TextFieldCount
            name={fieldsSale.AMOUNT}
            control={control}
            label="Quantidade"
            defaultValue={defaultValueAmount}
            valueCurrent={amount}
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
