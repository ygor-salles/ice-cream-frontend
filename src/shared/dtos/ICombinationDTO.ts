import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import Mask from 'shared/utils/masks';
import * as yup from 'yup';

export interface ICombinationDTO {
  id?: number;
  name: string;
  price: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormCombination {
  id?: number;
  name: string;
  price: string;
}

export const fieldsCombination = {
  NAME: 'name',
  PRICE: 'price',
};

export const defaultValuesCombination = {
  [fieldsCombination.NAME]: '',
  [fieldsCombination.PRICE]: '',
};

export const defaultValuesCombinationEdit = (combination: ICombinationDTO) => ({
  id: combination.id,
  [fieldsCombination.NAME]: combination.name,
  [fieldsCombination.PRICE]: formatNumberToCurrencyInput(combination.price),
});

export const schemaCreateCombination = yup.object().shape({
  [fieldsCombination.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsCombination.PRICE]: yup.string().required('Preço é obrigatório'),
});

export const transformObject = (dataForm: IFormCombination): ICombinationDTO => {
  const object: ICombinationDTO = {
    name: dataForm.name,
    price: Mask.convertCurrency(dataForm.price),
  };
  return object;
};
