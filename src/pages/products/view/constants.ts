// Table Row --------------------------
export const columnType = {
  NAME: 'name',
  PRICE: 'price',
  STATUS: 'status',
  ACTION: 'action',
};

export const columnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.PRICE]: { order: 2 },
  [columnType.STATUS]: { order: 3 },
  [columnType.ACTION]: { order: 4, align: 'center' },
};

export const columnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.PRICE]: 'Preço',
  [columnType.STATUS]: 'Em estoque',
  [columnType.ACTION]: 'Ações',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  DESCRIPTION: 'description',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse = {
  [columnTypeCollapse.DESCRIPTION]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2, align: 'right' },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'right' },
};

export const columnLabelCollapse = {
  [columnTypeCollapse.DESCRIPTION]: 'Descrição',
  [columnTypeCollapse.CREATED_AT]: 'Data criação',
  [columnTypeCollapse.UPDATED_AT]: 'Data atualização',
};
