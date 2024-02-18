import { TypeDefaultOptions } from 'shared/components/SelectApp';
import { EnumTypeSale } from 'shared/dtos/ISaleDTO';

export const LISTTYPESALES: TypeDefaultOptions[] = [
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

export const LISTTYPESALES_NOTDEBIT: TypeDefaultOptions[] = [
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
];
