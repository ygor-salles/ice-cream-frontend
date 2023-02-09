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

export const defaultValuesPurchase = {
  value_total: '',
  observation: '',
  its_ice_cream_shoop: true,
  file: null,
  provider_id: '',
};

export const defaultValuesPurchaseEdit = (purchase: IPurchaseDTO) => ({
  id: purchase.id,
  value_total: formatNumberToCurrencyInput(purchase.value_total),
  observation: purchase.observation,
  its_ice_cream_shoop: purchase.its_ice_cream_shoop,
  nf_url: purchase.nf_url,
  provider_id: purchase.provider_id.toString(),
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

export const schemaCreatePurchase = yup.object().shape({
  value_total: yup.string().required('Valor total é obrigatório'),
  observation: yup.string().optional(),
  its_ice_cream_shoop: yup.boolean().required('Marcação é obrigatório'),
  provider_id: yup.string().required('A seleção de fornecedor é obrigatória'),
  file: yup.string().optional(),
});
