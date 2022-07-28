import { api } from '../api';
import { ICreateProviderDTORequest, ICreateProviderDTOResponse } from './dtos/ICreateProviderDTO';
import { IDeleteProviderDTOResponse } from './dtos/IDeleteProviderDTO';
import { ILoadByIdProviderDTOResponse } from './dtos/ILoadByIdProviderDTO';
import { ILoadProviderDTOResponse } from './dtos/ILoadProviderDTO';
import { IUpdateProviderDTORequest, IUpdateProviderDTOResponse } from './dtos/IUpdateProviderDTO';

export default class ProviderService {
  private route = '/providers';

  public async create(dataRequest: ICreateProviderDTORequest): Promise<ICreateProviderDTOResponse> {
    const { data } = await api.post<ICreateProviderDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadProviderDTOResponse[]> {
    const { data } = await api.get<ILoadProviderDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdProviderDTOResponse> {
    const { data } = await api.get<ILoadByIdProviderDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(
    dataRequest: IUpdateProviderDTORequest,
  ): Promise<IUpdateProviderDTOResponse> {
    const { data } = await api.put<IUpdateProviderDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteProviderDTOResponse> {
    const { data } = await api.delete<IDeleteProviderDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
