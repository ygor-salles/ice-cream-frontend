import { api } from '../api';
import {
  ICreateCashClosingDTORequest,
  ICreateCashClosingDTOResponse,
} from './dtos/ICreateCashClosingDTO';
import { ICreateSaleDTORequest, ICreateSaleDTOResponse } from './dtos/ICreateSaleDTO';
import { IDeleteSaleDTOResponse } from './dtos/IDeleteSaleDTO';
import { ILoadActivetedAcaiDTOResponse } from './dtos/ILoadActivetedAcaiDTO';
import { ILoadByIdSaleDTOResponse } from './dtos/ILoadByIdSaleDTO';
import { ILoadPagedSalesDTORequest, ILoadPagedSalesDTOResponse } from './dtos/ILoadPagedSalesDTO';
import { ILoadSumSalesDTORequest, ILoadSumSalesDTOResponse } from './dtos/ILoadSumSalesDTO';
import { ILoadSumSalesTodayDTOResponse } from './dtos/ILoadSumSalesTodayDTO';
import { IUpdateSaleDTORequest, IUpdateSaleDTOResponse } from './dtos/IUpdateSaleDTO';

export default class SaleService {
  private route = '/sales';

  public async create(dataRequest: ICreateSaleDTORequest): Promise<ICreateSaleDTOResponse> {
    const { data } = await api.post<ICreateSaleDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdSaleDTOResponse> {
    const { data } = await api.get<ILoadByIdSaleDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(dataRequest: IUpdateSaleDTORequest): Promise<IUpdateSaleDTOResponse> {
    const { data } = await api.put<IUpdateSaleDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteSaleDTOResponse> {
    const { data } = await api.delete<IDeleteSaleDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async loadPaged(params: ILoadPagedSalesDTORequest): Promise<ILoadPagedSalesDTOResponse> {
    const { data } = await api.get<ILoadPagedSalesDTOResponse>(`${this.route}/paged`, {
      params: { ...params },
    });
    return data;
  }

  public async loadSumByPeriod(
    dataRequest: ILoadSumSalesDTORequest,
  ): Promise<ILoadSumSalesDTOResponse> {
    const { data } = await api.post<ILoadSumSalesDTOResponse>(`${this.route}/period`, dataRequest);
    return data;
  }

  public async loadSumToday(): Promise<ILoadSumSalesTodayDTOResponse> {
    const { data } = await api.get<ILoadSumSalesTodayDTOResponse>(`${this.route}/today`);
    return data;
  }

  public async createCashClosing(
    dataRequest: ICreateCashClosingDTORequest,
  ): Promise<ICreateCashClosingDTOResponse> {
    const { data } = await api.post<ICreateCashClosingDTOResponse>(
      `${this.route}/cash-closing`,
      dataRequest,
    );
    return data;
  }

  public async loadSalesActivatedAcai(): Promise<ILoadActivetedAcaiDTOResponse[]> {
    const { data } = await api.get<ILoadActivetedAcaiDTOResponse[]>(`${this.route}/activated-acai`);
    return data;
  }
}
