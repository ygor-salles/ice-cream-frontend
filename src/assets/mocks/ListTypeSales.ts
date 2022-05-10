import { EnumTypeSale } from '../../shared/dtos/ISaleDTO';

interface TypeSale {
  id: number;
  name: string;
}

export const LISTTYPESALES: TypeSale[] = [
  {
    id: 1,
    name: EnumTypeSale.PIX,
  },
  {
    id: 2,
    name: EnumTypeSale.CARD,
  },
  {
    id: 3,
    name: EnumTypeSale.MONEY,
  },
  {
    id: 4,
    name: EnumTypeSale.DEBIT,
  },
];
