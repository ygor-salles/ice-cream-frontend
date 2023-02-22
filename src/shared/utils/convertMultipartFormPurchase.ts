import { fieldsPurchase } from 'shared/dtos/IPurchaseDTO';
import { ICreatePurchaseDTORequest } from 'shared/services/PurchaseService/dtos/ICreatePurchaseDTO';
import { IUpdatePurchaseDTORequest } from 'shared/services/PurchaseService/dtos/IUpdatePurchaseDTO';

export const convertMultipartFormPurchase = (
  dataRequest: IUpdatePurchaseDTORequest | ICreatePurchaseDTORequest,
): FormData => {
  const formData = new FormData();

  formData.append(fieldsPurchase.VALUE_TOTAL, dataRequest.value_total.toString());

  if (dataRequest?.observation?.length > 0) {
    formData.append(fieldsPurchase.OBSERVATION, dataRequest.observation);
  }

  formData.append(
    fieldsPurchase.ITS_ICE_CREAM_SHOP,
    dataRequest.its_ice_cream_shoop ? 'true' : 'false',
  );

  if (dataRequest?.file) {
    formData.append(fieldsPurchase.FILE, dataRequest.file);
  }

  formData.append(fieldsPurchase.PROVIDER_ID, dataRequest.provider_id.toString());

  return formData;
};
