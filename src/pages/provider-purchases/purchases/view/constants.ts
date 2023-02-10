import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from 'shared/components/table/types';

// Table Row --------------------------
export const mappedColumnSubObject = {
  PROVIDER: 'provider',
  VALUE_TOTAL: 'value_total',
  ITS_ICE_CREAM_SHOOP: 'its_ice_cream_shoop',
};

export const columnType = {
  PROVIDER: 'provider',
  VALUE_TOTAL: 'value_total',
  ITS_ICE_CREAM_SHOOP: 'its_ice_cream_shoop',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.PROVIDER]: { order: 1 },
  [columnType.VALUE_TOTAL]: { order: 2 },
  [columnType.ITS_ICE_CREAM_SHOOP]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.PROVIDER]: 'Fornecedor',
  [columnType.VALUE_TOTAL]: 'Valor',
  [columnType.ITS_ICE_CREAM_SHOOP]: 'Ref. Sorveteria',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  OBSERVATION: 'observation',
  NF_URL: 'nf_url',
  UPDATED_AT: 'updated_at',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.OBSERVATION]: { order: 1 },
  [columnTypeCollapse.NF_URL]: { order: 2 },
  [columnTypeCollapse.UPDATED_AT]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.OBSERVATION]: 'Observação',
  [columnTypeCollapse.NF_URL]: 'NF URL',
  [columnTypeCollapse.UPDATED_AT]: 'Atualização',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: `${columnType.PROVIDER}.name`, placeholder: 'fornecedor', type: 'string' },
  {
    searchPropertName: columnType.VALUE_TOTAL,
    placeholder: 'Valor',
    type: 'number',
  },
  {
    searchPropertName: columnType.ITS_ICE_CREAM_SHOOP,
    placeholder: 'Ref. a sorveteria',
    type: 'yesOrNot',
  },
];
