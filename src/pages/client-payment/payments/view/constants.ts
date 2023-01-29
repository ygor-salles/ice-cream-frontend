import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/table/types';

// Table Row --------------------------

export const mappedColumnSubObject = {
  VALUE: 'value',
  CLIENT: 'client',
  DEBIT: 'debit',
};
/*
  Como o array de Objetos de pagamentos possui um subObjeto "client" para mapear no componente table,
  é necessário a constante mappedColumnSubObject

  Exemplo do dado pagamento

  {
    client: {id: 3, name: "Marcela", phone: "(35) 98478-3671", debit: 18, created_at: "2022-10-18T01:47:49.631Z",…},
    client_id: 3,
    created_at: "2022-11-21T23:27:17.841Z",
    id: 1,
    observation: null,
    value: 2,
    updated_at: "2022-11-21T23:27:17.841Z",
  }
*/

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
  { searchPropertName: columnType.CLIENT, placeholder: 'cliente', type: 'string' },
  { searchPropertName: columnType.DEBIT, placeholder: 'dívida', type: 'number' },

  {
    searchPropertName: columnTypeCollapse.UPDATED_AT,
    placeholder: 'Atualização (dd/mm/aaaa)',
    type: 'timestamp',
  },
];
