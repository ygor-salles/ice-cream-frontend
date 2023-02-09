import Mask from 'shared/constants/masks';
import formatNumberToCurrencyInput from 'shared/utils/formaNumberToCurrencyInput';
import * as yup from 'yup';

import { IProviderDTO } from './IProviderDTO';

export interface IPurchaseDTO {
  id?: number;
  value_total: number;
  observation?: string;
  its_ice_cream_shoop: boolean;
  file?: File;
  nf_url?: string;
  created_at?: Date;
  updated_at?: Date;
  provider_id: number;
  provider?: IProviderDTO;
}

export interface IFormPurchase {
  id?: number;
  value_total: string;
  observation?: string;
  provider_id: string;
  its_ice_cream_shoop: boolean;
  file?: File;
  nf_url?: string;
}

export const fieldsPurchase = {
  VALUE_TOTAL: 'value_total',
  OBSERVATION: 'observation',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
  FILE: 'file',
  PROVIDER_ID: 'provider_id',
  NF_URL: 'nf_url',
};

export const defaultValuesPurchase = {
  [fieldsPurchase.VALUE_TOTAL]: '',
  [fieldsPurchase.OBSERVATION]: '',
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: true,
  [fieldsPurchase.FILE]: null,
  [fieldsPurchase.PROVIDER_ID]: '',
};

export const defaultValuesPurchaseEdit = (purchase: IPurchaseDTO) => ({
  id: purchase.id,
  [fieldsPurchase.VALUE_TOTAL]: formatNumberToCurrencyInput(purchase.value_total),
  [fieldsPurchase.OBSERVATION]: purchase.observation,
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: purchase.its_ice_cream_shoop,
  [fieldsPurchase.NF_URL]: purchase.nf_url,
  [fieldsPurchase.PROVIDER_ID]: purchase.provider_id.toString(),
});

export const schemaCreatePurchase = yup.object().shape({
  [fieldsPurchase.VALUE_TOTAL]: yup.string().required('Valor total é obrigatório'),
  [fieldsPurchase.OBSERVATION]: yup.string().optional(),
  [fieldsPurchase.ITS_ICE_CREAM_SHOP]: yup.boolean().required('Marcação é obrigatório'),
  [fieldsPurchase.PROVIDER_ID]: yup.string().required('A seleção de fornecedor é obrigatória'),
  [fieldsPurchase.FILE]: yup.string().optional(),
});

export const transformObject = (dataForm: IFormPurchase): IPurchaseDTO => {
  const object: IPurchaseDTO = {
    ...dataForm,
    value_total: Mask.convertCurrency(dataForm.value_total),
    provider_id: Number(dataForm.provider_id),
  };
  if (dataForm.observation.length === 0) {
    delete object.observation;
  }
  if (!dataForm.file) {
    delete object.file;
  }
  return object;
};
