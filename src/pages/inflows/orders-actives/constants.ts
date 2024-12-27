import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/TableApp/types';

// Table Row --------------------------
export const columnType = {
  CLIENT: 'client',
  DATA_PRODUCT: 'data_product',
  CREATED_AT: 'created_at',
  TOTAL: 'total',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.CLIENT]: { order: 1 },
  [columnType.DATA_PRODUCT]: { order: 2 },
  [columnType.CREATED_AT]: { order: 3 },
  [columnType.TOTAL]: { order: 4, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.CLIENT]: 'Cliente',
  [columnType.DATA_PRODUCT]: 'Produto',
  [columnType.CREATED_AT]: 'Hora',
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
