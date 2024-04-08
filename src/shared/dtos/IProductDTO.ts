import { ICombinationDTO } from './ICombinationDTO';

export enum EnumTypeProduct {
  ICE_CREAM = 'SORVETE',
  ACAI = 'ACAI',
  POPSICLE = 'PICOLE',
  GELADINHO = 'GELADINHO',
  SALTY = 'SALGADO',
  GENERAL = 'GERAL',
}

export interface IProductDTO {
  id?: number;
  name: string;
  price: number;
  description?: string;
  type: EnumTypeProduct;
  status?: boolean;
  created_at?: string;
  updated_at?: string;
  combinations?: ICombinationDTO[];
}

export interface IFormProduct {
  id?: number;
  name: string;
  price: string;
  description: string;
  type: string;
}
