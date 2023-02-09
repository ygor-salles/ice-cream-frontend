import { fieldsPurchase } from 'shared/dtos/IPurchaseDTO';

import { api } from '../api';
import { ICreatePurchaseDTORequest, ICreatePurchaseDTOResponse } from './dtos/ICreatePurchaseDTO';
import { IDeletePurchaseDTOResponse } from './dtos/IDeletePurchaseDTO';
import { ILoadByIdPurchaseDTOResponse } from './dtos/ILoadByIdPurchaseDTO';
import { ILoadPurchaseDTOResponse } from './dtos/ILoadPurchaseDTO';
import { IUpdatePurchaseDTORequest, IUpdatePurchaseDTOResponse } from './dtos/IUpdatePurchaseDTO';

export default class PurchaseService {
  private route = '/purchase';

  public async create(dataRequest: ICreatePurchaseDTORequest): Promise<ICreatePurchaseDTOResponse> {
    const formData = new FormData();
    formData.append(fieldsPurchase.VALUE_TOTAL, dataRequest.value_total.toString());
    formData.append(fieldsPurchase.OBSERVATION, dataRequest.observation);
    formData.append(
      fieldsPurchase.ITS_ICE_CREAM_SHOP,
      dataRequest.its_ice_cream_shoop ? 'true' : 'false',
    );
    formData.append(fieldsPurchase.FILE, dataRequest.file);
    formData.append(fieldsPurchase.PROVIDER_ID, dataRequest.provider_id.toString());

    const { data } = await api.post<ICreatePurchaseDTOResponse>(this.route, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  }

  public async loadAll(): Promise<ILoadPurchaseDTOResponse[]> {
    const { data } = await api.get<ILoadPurchaseDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdPurchaseDTOResponse> {
    const { data } = await api.get<ILoadByIdPurchaseDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(
    dataRequest: IUpdatePurchaseDTORequest,
  ): Promise<IUpdatePurchaseDTOResponse> {
    const { data } = await api.put<IUpdatePurchaseDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeletePurchaseDTOResponse> {
    const { data } = await api.delete<IDeletePurchaseDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
