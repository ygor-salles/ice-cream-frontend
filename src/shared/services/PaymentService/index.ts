import { api } from '../api';
import { ICreatePaymentDTORequest, ICreatePaymentDTOResponse } from './dtos/ICreatePaymentDTO';
import { IDeletePaymentDTOResponse } from './dtos/IDeletePaymentDTO';
import { ILoadByIdPaymentDTOResponse } from './dtos/ILoadByIdPaymentDTO';
import { ILoadPagedPaymentsDTOResponse } from './dtos/ILoadPagedPaymentsDTO';
import { ILoadPaymentDTOResponse } from './dtos/ILoadPaymentDTO';
import { IUpdatePaymentDTORequest, IUpdatePaymentDTOResponse } from './dtos/IUpdatePaymentDTO';

export default class PaymentService {
  private route = '/payments';

  public async create(dataRequest: ICreatePaymentDTORequest): Promise<ICreatePaymentDTOResponse> {
    const { data } = await api.post<ICreatePaymentDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadPaymentDTOResponse[]> {
    const { data } = await api.get<ILoadPaymentDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdPaymentDTOResponse> {
    const { data } = await api.get<ILoadByIdPaymentDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(
    dataRequest: IUpdatePaymentDTORequest,
  ): Promise<IUpdatePaymentDTOResponse> {
    const { data } = await api.put<IUpdatePaymentDTOResponse>(
      `${this.route}/${dataRequest.id}`,
      dataRequest,
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeletePaymentDTOResponse> {
    const { data } = await api.delete<IDeletePaymentDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async loadPaged(limit: number, page: number): Promise<ILoadPagedPaymentsDTOResponse> {
    const { data } = await api.get<ILoadPagedPaymentsDTOResponse>(`${this.route}/paged`, {
      params: { limit, page },
    });
    return data;
  }
}
