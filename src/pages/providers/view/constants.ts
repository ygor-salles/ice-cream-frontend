import {
  ITypeColumnConfig,
  ITypeColumnLabel,
  ITypeColumnType,
} from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType: ITypeColumnType = {
  NAME: 'name',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
  ACTION: 'action',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.ITS_ICE_CREAM_SHOP]: { order: 2 },
  [columnType.ACTION]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.ITS_ICE_CREAM_SHOP]: 'Ref. Sorveteria',
  [columnType.ACTION]: 'Ações',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse: ITypeColumnType = {
  PHONE: 'phone',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.PHONE]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'right' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.PHONE]: 'Telefone',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
