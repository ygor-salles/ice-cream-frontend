import { api } from '../api';
import { ILoginDTORequest } from './dtos/ILoginDTORequest';
import { ILoginDTOResponse } from './dtos/ILoginDTOResponse';

export default class AuthService {
  private route = '/signin';

  public async login(dataRequest: ILoginDTORequest): Promise<ILoginDTOResponse> {
    const { data } = await api.post<ILoginDTOResponse>(this.route, dataRequest);
    return data;
  }
}
