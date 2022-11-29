import {
  ITypeColumnConfig,
  ITypeColumnType,
  ITypeColumnLabel,
  IRenderInputSearch,
} from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType: ITypeColumnType = {
  NAME: 'name',
  PRICE: 'price',
  STATUS: 'status',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.PRICE]: { order: 2 },
  [columnType.STATUS]: { order: 3 },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.PRICE]: 'Preço',
  [columnType.STATUS]: 'Em estoque',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse: ITypeColumnType = {
  DESCRIPTION: 'description',
  UPDATED_AT: 'updated_at',
  ACTION: 'action',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.DESCRIPTION]: { order: 1 },
  [columnTypeCollapse.UPDATED_AT]: { order: 2, align: 'center' },
  [columnTypeCollapse.ACTION]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.DESCRIPTION]: 'Descrição',
  [columnTypeCollapse.UPDATED_AT]: 'Atualização',
  [columnTypeCollapse.ACTION]: 'Ação',
};

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: columnType.NAME, placeholder: 'nome' },
  // { searchPropertName: columnType.PRICE, placeholder: 'preço' },
  // { searchPropertName: columnType.STATUS, placeholder: 'status' },
  // { searchPropertName: columnTypeCollapse.UPDATED_AT, placeholder: 'data de atualização' },
];
