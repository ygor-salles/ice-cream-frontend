import { ICombinationDTO } from 'shared/dtos';
import { formatNumberToCurrencyInput } from 'shared/utils';
import * as yup from 'yup';

export const fieldsCombination = {
  NAME: 'name',
  PRICE: 'price',
};

export const schemaCombination = yup.object().shape({
  [fieldsCombination.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsCombination.PRICE]: yup.string().required('Preço é obrigatório'),
});

export const defaultValuesCombination = {
  [fieldsCombination.NAME]: '',
  [fieldsCombination.PRICE]: '',
};

export const defaultValuesCombinationEdit = (combination: ICombinationDTO) => ({
  id: combination.id,
  [fieldsCombination.NAME]: combination.name,
  [fieldsCombination.PRICE]: formatNumberToCurrencyInput(combination.price),
});
