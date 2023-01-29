import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/table/types';

// Table Row --------------------------
export const columnType = {
  NAME: 'name',
  ITS_ICE_CREAM_SHOP: 'its_ice_cream_shoop',
  UPDATED_AT: 'updated_at',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.ITS_ICE_CREAM_SHOP]: { order: 2 },
  [columnType.UPDATED_AT]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.ITS_ICE_CREAM_SHOP]: 'Ref. Sorveteria',
  [columnType.UPDATED_AT]: 'Atualização',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  PHONE: 'phone',
  CREATED_AT: 'created_at',
  ACTION: 'action',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.PHONE]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2 },
  [columnTypeCollapse.ACTION]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.PHONE]: 'Telefone',
  [columnTypeCollapse.CREATED_AT]: 'Criação',
  [columnTypeCollapse.ACTION]: 'Ações',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: columnType.NAME, placeholder: 'nome', type: 'string' },
  {
    searchPropertName: columnType.ITS_ICE_CREAM_SHOP,
    placeholder: 'ref. sorveteria',
    type: 'yesOrNot',
  },
  {
    searchPropertName: columnType.UPDATED_AT,
    placeholder: 'Atualização (dd/mm/aaaa)',
    type: 'timestamp',
  },

  { searchPropertName: columnTypeCollapse.PHONE, placeholder: 'phone', type: 'string' },
  {
    searchPropertName: columnTypeCollapse.CREATED_AT,
    placeholder: 'Criação (dd/mm/aaaa)',
    type: 'timestamp',
  },
];
