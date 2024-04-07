import { EnumTypeProduct, IProductDTO } from 'shared/dtos';
import { formatNumberToCurrencyInput } from 'shared/utils';
import * as yup from 'yup';

export const fieldsProduct = {
  NAME: 'name',
  PRICE: 'price',
  DESCRIPTION: 'description',
  TYPE: 'type',
};

export const schemaProduct = yup.object().shape({
  [fieldsProduct.NAME]: yup.string().required('Nome é obrigatório'),
  [fieldsProduct.PRICE]: yup.string().required('Preço é obrigatório'),
  [fieldsProduct.DESCRIPTION]: yup.string().optional(),
  [fieldsProduct.TYPE]: yup
    .mixed<EnumTypeProduct>()
    .oneOf(Object.values(EnumTypeProduct))
    .required('Tipo de produto é obrigatório'),
});

export const defaultValuesProduct = {
  [fieldsProduct.NAME]: '',
  [fieldsProduct.PRICE]: '',
  [fieldsProduct.DESCRIPTION]: '',
  [fieldsProduct.TYPE]: '',
};

export const defaultValuesProductEdit = (product: IProductDTO) => ({
  id: product.id,
  [fieldsProduct.NAME]: product.name,
  [fieldsProduct.PRICE]: formatNumberToCurrencyInput(product.price),
  [fieldsProduct.DESCRIPTION]: product.description,
  [fieldsProduct.TYPE]: product.type,
});
