import { EnumTypeProduct } from 'shared/dtos/IProductDTO';

export interface ILoadProductDTOResponse {
  id: number;
  name: string;
  price: number;
  description: string;
  type: EnumTypeProduct;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
