import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/table/types';

// Table Row --------------------------

export const columnType = {
  VALUE: 'value',
  CLIENT: 'client',
  DEBIT: 'debit',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.VALUE]: { order: 1 },
  [columnType.CLIENT]: { order: 2 },
  [columnType.DEBIT]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.VALUE]: 'Valor pagamento',
  [columnType.CLIENT]: 'Cliente',
  [columnType.DEBIT]: 'Dívida atual',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  OBSERVATION: 'observation',
  UPDATED_AT: 'updated_at',
  ACTION: 'action',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.OBSERVATION]: { order: 1 },
  [columnTypeCollapse.UPDATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.ACTION]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.OBSERVATION]: 'Observação',
  [columnTypeCollapse.UPDATED_AT]: 'Atualização',
  [columnTypeCollapse.ACTION]: 'Ações',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: columnType.VALUE, placeholder: 'valor pagamento', type: 'number' },

  // para subObjetos é necessário colocar o nome da propriedade e da subpropriedade
  { searchPropertName: `${columnType.CLIENT}.name`, placeholder: 'cliente', type: 'string' },
  { searchPropertName: `${columnType.CLIENT}.debit`, placeholder: 'dívida', type: 'number' },

  {
    searchPropertName: columnTypeCollapse.UPDATED_AT,
    placeholder: 'Atualização (dd/mm/aaaa)',
    type: 'timestamp',
  },
];
