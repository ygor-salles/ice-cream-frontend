import { ITypeColumnConfig, ITypeColumnLabel } from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType = {
  VALUE: 'value',
  CLIENT: 'client',
  ACTION: 'action',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.VALUE]: { order: 1 },
  [columnType.CLIENT]: { order: 2 },
  [columnType.ACTION]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.VALUE]: 'Valor',
  [columnType.CLIENT]: 'Cliente',
  [columnType.ACTION]: 'Ações',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  OBSERVATION: 'observation',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.OBSERVATION]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'right' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.OBSERVATION]: 'Observação',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
