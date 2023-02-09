import { api } from '../api';
import { ICreatePurchaseDTORequest, ICreatePurchaseDTOResponse } from './dtos/ICreatePurchaseDTO';
import { IDeletePurchaseDTOResponse } from './dtos/IDeletePurchaseDTO';
import { ILoadByIdPurchaseDTOResponse } from './dtos/ILoadByIdPurchaseDTO';
import { ILoadPurchaseDTOResponse } from './dtos/ILoadPurchaseDTO';
import { IUpdatePurchaseDTORequest, IUpdatePurchaseDTOResponse } from './dtos/IUpdatePurchaseDTO';

export default class PurchaseService {
  private route = '/purchase';

  public async create(dataRequest: ICreatePurchaseDTORequest): Promise<ICreatePurchaseDTOResponse> {
    const { data } = await api.post<ICreatePurchaseDTOResponse>(this.route, dataRequest);
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
