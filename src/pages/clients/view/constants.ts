import {
  ITypeColumnConfig,
  ITypeColumnLabel,
  ITypeColumnType,
} from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType: ITypeColumnType = {
  NAME: 'name',
  DEBIT: 'debit',
  ACTION: 'action',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.DEBIT]: { order: 2 },
  [columnType.ACTION]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.DEBIT]: 'Preço',
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
  [columnTypeCollapse.PHONE]: 'Descrição',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
