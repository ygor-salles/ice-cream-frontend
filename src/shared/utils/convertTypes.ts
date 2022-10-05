import { EnumTypeProduct } from '../dtos/IProductDTO';
import { EnumTypeSale } from '../dtos/ISaleDTO';

export function convetSalesType(type_sale: string): EnumTypeSale {
  switch (type_sale) {
    case EnumTypeSale.CARD:
      return EnumTypeSale.CARD;
    case EnumTypeSale.DEBIT:
      return EnumTypeSale.DEBIT;
    case EnumTypeSale.MONEY:
      return EnumTypeSale.MONEY;
    case EnumTypeSale.PIX:
      return EnumTypeSale.PIX;
    default:
      break;
  }
  return EnumTypeSale.MONEY;
}

export function convertProductsType(type_product: string): EnumTypeProduct {
  switch (type_product) {
    case EnumTypeProduct.ACAI:
      return EnumTypeProduct.ACAI;
    case EnumTypeProduct.GELADINHO:
      return EnumTypeProduct.GELADINHO;
    case EnumTypeProduct.GENERAL:
      return EnumTypeProduct.GENERAL;
    case EnumTypeProduct.ICE_CREAM:
      return EnumTypeProduct.ICE_CREAM;
    case EnumTypeProduct.POPSICLE:
      return EnumTypeProduct.POPSICLE;
    case EnumTypeProduct.SALTY:
      return EnumTypeProduct.SALTY;
    default:
      break;
  }
  return EnumTypeProduct.GENERAL;
}
