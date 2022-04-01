import { api } from '../api';
import { ICreateProductDTORequest, ICreateProductDTOResponse } from './dtos/ICreateProductDTO';
import { IDeleteProductDTOResponse } from './dtos/IDeleteProductDTO';
import { ILoadByIdProductDTOResponse } from './dtos/ILoadByIdProductDTO';
import { ILoadProductDTOResponse } from './dtos/ILoadProductDTO';
import { IUpdateProductDTORequest, IUpdateProductDTOResponse } from './dtos/IUpdateProductDTO';

export default class ProductService {
  private route = '/products';

  public async create(dataRequest: ICreateProductDTORequest): Promise<ICreateProductDTOResponse> {
    const { data } = await api.post<ICreateProductDTOResponse>(this.route, dataRequest);
    return data;
  }

  public async loadAll(): Promise<ILoadProductDTOResponse[]> {
    const { data } = await api.get<ILoadProductDTOResponse[]>(this.route);
    return data;
  }

  public async loadById(id: number): Promise<ILoadByIdProductDTOResponse> {
    const { data } = await api.get<ILoadByIdProductDTOResponse>(`${this.route}/${id}`);
    return data;
  }

  public async updateById(dataRequest: IUpdateProductDTORequest): Promise<IUpdateProductDTOResponse> {
    const { data } = await api.post<IUpdateProductDTOResponse>(
      `${this.route}/${dataRequest.id}`, dataRequest
    );
    return data;
  }

  public async deleteById(id: number): Promise<IDeleteProductDTOResponse> {
    const { data } = await api.get<IDeleteProductDTOResponse>(`${this.route}/${id}`);
    return data;
  }
}