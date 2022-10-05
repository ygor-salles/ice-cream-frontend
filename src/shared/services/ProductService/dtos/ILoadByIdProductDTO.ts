import { EnumTypeProduct } from '../../../dtos/IProductDTO';

export interface ILoadByIdProductDTOResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  type: EnumTypeProduct;
  created_at: Date;
  updated_at: Date;
}
