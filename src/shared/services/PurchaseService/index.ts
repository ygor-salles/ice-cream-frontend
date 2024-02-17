import { convertMultipartFormPurchase } from 'shared/utils/convertMultipartFormPurchase';

import { api } from '../api';
import { ICreatePurchaseDTORequest, ICreatePurchaseDTOResponse } from './dtos/ICreatePurchaseDTO';
import { IDeletePurchaseDTOResponse } from './dtos/IDeletePurchaseDTO';
import { ILoadByIdPurchaseDTOResponse } from './dtos/ILoadByIdPurchaseDTO';
import {
  ILoadPagedPurchasesDTORequest,
  ILoadPagedPurchasesDTOResponse,
} from './dtos/ILoadPagedPurchasesDTO';
import { ILoadPurchaseDTOResponse } from './dtos/ILoadPurchaseDTO';
import {
  ILoadSumPurchaseDTORequest,
  ILoadSumPurchaseDTOResponse,
} from './dtos/ILoadSumPurchaseDTO';
import { ILoadSumPurchasesTodayDTOResponse } from './dtos/ILoadSumPurchaseTodayDTO';
import { IUpdatePurchaseDTORequest, IUpdatePurchaseDTOResponse } from './dtos/IUpdatePurchaseDTO';

export default class PurchaseService {
  private route = '/purchase';

  public async create(dataRequest: ICreatePurchaseDTORequest): Promise<ICreatePurchaseDTOResponse> {
    const formData = convertMultipartFormPurchase(dataRequest);

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
    const formData = convertMultipartFormPurchase(dataRequest);

    const { data } = await api.put<IUpdatePurchaseDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeletePurchaseDTOResponse> {
    const { data } = await api.delete<IDeletePurchaseDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async loadSumByPeriod(
    dataRequest: ILoadSumPurchaseDTORequest,
  ): Promise<ILoadSumPurchaseDTOResponse> {
    const { data } = await api.post<ILoadSumPurchaseDTOResponse>(
      `${this.route}/period`,
      dataRequest,
    );
    return data;
  }

  public async loadSumToday(): Promise<ILoadSumPurchasesTodayDTOResponse> {
    const { data } = await api.get<ILoadSumPurchasesTodayDTOResponse>(`${this.route}/today`);
    return data;
  }

  public async loadPaged(
    params: ILoadPagedPurchasesDTORequest,
  ): Promise<ILoadPagedPurchasesDTOResponse> {
    const { data } = await api.get<ILoadPagedPurchasesDTOResponse>(`${this.route}/paged`, {
      params: { ...params },
    });
    return data;
  }
}
