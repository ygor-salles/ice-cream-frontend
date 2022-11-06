// Table Row --------------------------
export const columnType = {
  NAME: 'name',
  DEBIT: 'debit',
  ACTION: 'action',
};

export const columnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.DEBIT]: { order: 2 },
  [columnType.ACTION]: { order: 3, align: 'center' },
};

export const columnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.DEBIT]: 'Preço',
  [columnType.ACTION]: 'Ações',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  PHONE: 'phone',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse = {
  [columnTypeCollapse.PHONE]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'right' },
};

export const columnLabelCollapse = {
  [columnTypeCollapse.PHONE]: 'Descrição',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
