import { IPurchaseDTO } from 'shared/dtos';
import { formatNumberToCurrencyInput } from 'shared/utils';
import * as yup from 'yup';

export const fieldsPurchase = {
  VALUE_TOTAL: 'value_total',
  OBSERVATION: 'observation',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
  FILE: 'file',
  PROVIDER_ID: 'provider_id',
  CREATED_AT: 'created_at',
  NF_URL: 'nf_url',
};

export const schemaPurchase = yup.object().shape({
  [fieldsPurchase.VALUE_TOTAL]: yup.string().required('Valor total é obrigatório'),
  [fieldsPurchase.OBSERVATION]: yup.string().optional().nullable(),
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: yup.boolean().required('Marcação é obrigatório'),
  [fieldsPurchase.PROVIDER_ID]: yup.string().required('A seleção de fornecedor é obrigatória'),
  [fieldsPurchase.CREATED_AT]: yup.string().optional(),
  [fieldsPurchase.FILE]: yup
    .mixed()
    .test('type', 'Formato inválido', (value: File) => {
      if (value) {
        return (
          value.type === 'image/png' ||
          value.type === 'image/jpg' ||
          value.type === 'image/jpeg' ||
          value.type === 'image/pjpeg' ||
          value.type === 'image/gif' ||
          value.type === 'image/svg+xml'
        );
      }
      return true;
    })
    .notRequired(),
});

export const defaultValuesPurchase = {
  [fieldsPurchase.VALUE_TOTAL]: '',
  [fieldsPurchase.OBSERVATION]: '',
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: true,
  [fieldsPurchase.FILE]: null,
  [fieldsPurchase.PROVIDER_ID]: '',
  [fieldsPurchase.CREATED_AT]: '',
};

export const defaultValuesPurchaseEdit = (purchase: IPurchaseDTO) => ({
  id: purchase.id,
  [fieldsPurchase.VALUE_TOTAL]: formatNumberToCurrencyInput(purchase.value_total),
  [fieldsPurchase.OBSERVATION]: purchase.observation,
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: purchase.its_ice_cream_shoop,
  [fieldsPurchase.NF_URL]: purchase.nf_url,
  [fieldsPurchase.PROVIDER_ID]: purchase.provider_id.toString(),
  [fieldsPurchase.CREATED_AT]: purchase.created_at,
});
