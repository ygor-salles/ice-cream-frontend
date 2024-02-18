import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/TableApp/types';

// Table Row --------------------------
export const columnType = {
  CLIENT: 'client',
  DATA_PRODUCT: 'data_product',
  TOTAL: 'total',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.CLIENT]: { order: 1 },
  [columnType.DATA_PRODUCT]: { order: 2 },
  [columnType.TOTAL]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.CLIENT]: 'Cliente',
  [columnType.DATA_PRODUCT]: 'Produto',
  [columnType.TOTAL]: 'Total',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: `${columnType.CLIENT}.name`, placeholder: 'cliente', type: 'string' },
  {
    searchPropertName: `${columnType.DATA_PRODUCT}.name`,
    placeholder: 'produto',
    type: 'string',
  },
  {
    searchPropertName: columnType.TOTAL,
    placeholder: 'total',
    type: 'number',
  },
];
