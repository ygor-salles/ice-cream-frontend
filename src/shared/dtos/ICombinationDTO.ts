import Mask from 'shared/constants/masks';
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

export const transformObject = (dataForm: IFormCombination): ICombinationDTO => {
  const object: ICombinationDTO = {
    name: dataForm.name,
    price: Mask.convertCurrency(dataForm.price),
  };
  return object;
};

export const schemaCreateCombination = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.string().required('Preço é obrigatório'),
});
