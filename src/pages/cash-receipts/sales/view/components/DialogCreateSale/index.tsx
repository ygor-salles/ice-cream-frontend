/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowBack } from '@mui/icons-material';
import { Button, Dialog, Theme, Typography, useMediaQuery } from '@mui/material';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AutoComplete, SelectMultiple, TextFieldApp, TextFieldCount } from 'shared/components';
import { ICombinationDTO } from 'shared/dtos/ICombinationDTO';
import { EnumTypeProduct, IProductDTO } from 'shared/dtos/IProductDTO';
import {
  IFormSale,
  defaultValueAmount,
  defaultValuesDialogSale,
  fieldsSale,
  schemaDialogCreateSale,
} from 'shared/dtos/ISaleDTO';
import { useDrawerContext } from 'shared/hooks/useDrawerContext';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import Mask from 'shared/utils/masks';

import { Form, GridForm, HeaderDialog, WrapperButtons } from './styles';

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

  const { allProductsStorage: allProd, allCombinationsStorage: allComb } = useDrawerContext();
  const allProductsStorage = allProd ?? [];
  const allCombinationsStorage = allComb ?? [];

  const [allCombinations, setAllCombinations] = useState<ICombinationDTO[]>(allCombinationsStorage);
  const [isDisabledTextFieldCount, setIsDisabledTextFieldCount] = useState(true);
  const [count, setCount] = useState(Number(defaultValueAmount));
  const [enableOptions, setEnableOptions] = useState(false);

  const handleClose = useCallback(() => {
    setCount(Number(defaultValueAmount));
    setIsDisabledTextFieldCount(true);
    reset();
    onClose();
  }, [open]);

  const ruleAcais = (product: IProductDTO) => {
    if (product.name.includes('200')) {
      setAllCombinations(allCombinations.map(item => ({ ...item, price: 3 })));
    } else if (product.name.includes(' 1L') || product.name.includes(' 1 L')) {
      setAllCombinations(allCombinations.map(item => ({ ...item, price: item.price + 1 })));
    } else {
      setAllCombinations(allCombinationsStorage);
    }
  };

  const onCloseSelectProduct = async (_: any) => {
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

  const onCloseSelectCombinations = (_: any) => {
    const optionsCombinations = getValues('combinations');
    const priceProduct = getValues('data_product.price');
    const amount = Number(getValues('amount'));

    let soma = optionsCombinations.reduce((acumulator, { price }) => acumulator + price, 0);
    soma += priceProduct;

    setValue('total', formatNumberToCurrencyInput(soma * amount));
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
