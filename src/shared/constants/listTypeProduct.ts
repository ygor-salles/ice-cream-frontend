import { EnumTypeProduct } from '../dtos/IProductDTO';

interface TypeProduct {
  id: number;
  name: string;
}

export const LISTTYPEPRODUCTS: TypeProduct[] = [
  {
    id: 1,
    name: EnumTypeProduct.ACAI,
  },
  {
    id: 2,
    name: EnumTypeProduct.GELADINHO,
  },
  {
    id: 3,
    name: EnumTypeProduct.GENERAL,
  },
  {
    id: 4,
    name: EnumTypeProduct.ICE_CREAM,
  },
  {
    id: 5,
    name: EnumTypeProduct.POPSICLE,
  },
  {
    id: 6,
    name: EnumTypeProduct.SALTY,
  },
];
