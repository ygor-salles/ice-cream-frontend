import { api } from '../api';
import { ICreateSaleDTORequest, ICreateSaleDTOResponse } from './dtos/ICreateSaleDTO';
import { IDeleteSaleDTOResponse } from './dtos/IDeleteSaleDTO';
import { ILoadByIdSaleDTOResponse } from './dtos/ILoadByIdSaleDTO';
import { ILoadSaleDTOResponse } from './dtos/ILoadSalesDTO';
import { IUpdateSaleDTORequest, IUpdateSaleDTOResponse } from './dtos/IUpdateSaleDTO';

export default class SaleService {
  private route = '/sales';

  public async create(dataRequest: ICreateSaleDTORequest): Promise<ICreateSaleDTOResponse> {
    const { data } = await api.post<ICreateSaleDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadSaleDTOResponse[]> {
    const { data } = await api.get<ILoadSaleDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdSaleDTOResponse> {
    const { data } = await api.get<ILoadByIdSaleDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(dataRequest: IUpdateSaleDTORequest): Promise<IUpdateSaleDTOResponse> {
    const { data } = await api.post<IUpdateSaleDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteSaleDTOResponse> {
    const { data } = await api.get<IDeleteSaleDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
