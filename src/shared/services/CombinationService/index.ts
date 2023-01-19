import { api } from '../api';
import {
  ICreateCombinationDTORequest,
  ICreateCombinationDTOResponse,
} from './dtos/ICreateCombinationDTO';
import { IDeleteCombinationDTOResponse } from './dtos/IDeleteCombinationDTO';
import { ILoadByIdCombinationDTOResponse } from './dtos/ILoadByIdCombinationDTO';
import { ILoadCombinationDTOResponse } from './dtos/ILoadCombinationDTO';
import {
  IUpdateCombinationDTORequest,
  IUpdateCombinationDTOResponse,
} from './dtos/IUpdateCombinationDTO';

export default class CombinationService {
  private route = '/combinations';

  public async create(
    dataRequest: ICreateCombinationDTORequest,
  ): Promise<ICreateCombinationDTOResponse> {
    const { data } = await api.post<ICreateCombinationDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadCombinationDTOResponse[]> {
    const { data } = await api.get<ILoadCombinationDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdCombinationDTOResponse> {
    const { data } = await api.get<ILoadByIdCombinationDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(
    dataRequest: IUpdateCombinationDTORequest,
  ): Promise<IUpdateCombinationDTOResponse> {
    const { data } = await api.put<IUpdateCombinationDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteCombinationDTOResponse> {
    const { data } = await api.delete<IDeleteCombinationDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
