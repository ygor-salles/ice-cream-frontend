import { api } from '../api';
import { ICreateUserDTORequest, ICreateUserDTOResponse } from './dtos/ICreateUserDTO';
import { IDeleteUserDTOResponse } from './dtos/IDeleteUserDTO';
import { ILoadByIdUserDTOResponse } from './dtos/ILoadByIdUserDTO';
import { ILoadUserDTOResponse } from './dtos/ILoadUserDTO';
import { IUpdateUserDTORequest, IUpdateUserDTOResponse } from './dtos/IUpdateUserDTO';

export default class UserService {
  private route = '/users';

  public async create(dataRequest: ICreateUserDTORequest): Promise<ICreateUserDTOResponse> {
    const { data } = await api.post<ICreateUserDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadUserDTOResponse[]> {
    const { data } = await api.get<ILoadUserDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdUserDTOResponse> {
    const { data } = await api.get<ILoadByIdUserDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(dataRequest: IUpdateUserDTORequest): Promise<IUpdateUserDTOResponse> {
    const { data } = await api.put<IUpdateUserDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteUserDTOResponse> {
    const { data } = await api.delete<IDeleteUserDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}
