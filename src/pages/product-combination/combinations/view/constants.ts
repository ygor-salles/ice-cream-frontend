import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/TableApp/types';

// Table Row --------------------------
export const columnType = {
  NAME: 'name',
  PRICE: 'price',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.PRICE]: { order: 2 },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.PRICE]: 'Preço',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  UPDATED_AT: 'updated_at',
  CREATED_AT: 'created_at',
  ACTION: 'action',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.UPDATED_AT]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2 },
  [columnTypeCollapse.ACTION]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.UPDATED_AT]: 'Atualização',
  [columnTypeCollapse.CREATED_AT]: 'Criação',
  [columnTypeCollapse.ACTION]: 'Ações',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: columnType.NAME, placeholder: 'nome', type: 'string' },
  {
    searchPropertName: columnType.PRICE,
    placeholder: 'preço',
    type: 'number',
  },
  {
    searchPropertName: columnTypeCollapse.UPDATED_AT,
    placeholder: 'Atualização (dd/mm/aaaa)',
    type: 'timestamp',
  },
  {
    searchPropertName: columnTypeCollapse.CREATED_AT,
    placeholder: 'Criação (dd/mm/aaaa)',
    type: 'timestamp',
  },
];
