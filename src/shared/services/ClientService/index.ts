import { api } from '../api';
import { ICreateClientDTORequest, ICreateClientDTOResponse } from './dtos/ICreateClientDTO';
import { IDeleteClientDTOResponse } from './dtos/IDeleteClientDTO';
import { ILoadByIdClientDTOResponse } from './dtos/ILoadByIdClientDTO';
import { ILoadClientDTOResponse } from './dtos/ILoadClientDTO';
import { IUpdateClientDTORequest, IUpdateClientDTOResponse } from './dtos/IUpdateClientDTO';

export default class ClientService {
  private route = '/clients';

  public async create(dataRequest: ICreateClientDTORequest): Promise<ICreateClientDTOResponse> {
    const { data } = await api.post<ICreateClientDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadClientDTOResponse[]> {
    const { data } = await api.get<ILoadClientDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdClientDTOResponse> {
    const { data } = await api.get<ILoadByIdClientDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(dataRequest: IUpdateClientDTORequest): Promise<IUpdateClientDTOResponse> {
    const { data } = await api.put<IUpdateClientDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteClientDTOResponse> {
    const { data } = await api.delete<IDeleteClientDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
