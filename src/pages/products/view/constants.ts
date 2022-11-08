import {
  ITypeColumnConfig,
  ITypeColumnType,
  ITypeColumnLabel,
} from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType: ITypeColumnType = {
  NAME: 'name',
  PRICE: 'price',
  STATUS: 'status',
  ACTION: 'action',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.PRICE]: { order: 2 },
  [columnType.STATUS]: { order: 3 },
  [columnType.ACTION]: { order: 4, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.PRICE]: 'Preço',
  [columnType.STATUS]: 'Em estoque',
  [columnType.ACTION]: 'Ações',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse: ITypeColumnType = {
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.DESCRIPTION]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'right' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.DESCRIPTION]: 'Descrição',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
