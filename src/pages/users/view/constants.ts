import {
  IRenderInputSearch,
  ITypeColumnConfig,
  ITypeColumnLabel,
} from '../../../shared/components/table/types';

// Table Row --------------------------
export const columnType = {
  NAME: 'name',
  ROLE: 'role',
  UPDATED_AT: 'updated_at',
};

export const columnConfig: ITypeColumnConfig = {
  [columnType.NAME]: { order: 1 },
  [columnType.ROLE]: { order: 2 },
  [columnType.UPDATED_AT]: { order: 3, align: 'center' },
};

export const columnLabel: ITypeColumnLabel = {
  [columnType.NAME]: 'Nome',
  [columnType.ROLE]: 'Acesso',
  [columnType.UPDATED_AT]: 'Atualização',
};

// Table Row Collapse --------------------------

export const columnTypeCollapse = {
  EMAIL: 'email',
  CREATED_AT: 'created_at',
  ACTION: 'action',
};

export const columnConfigCollapse: ITypeColumnConfig = {
  [columnTypeCollapse.EMAIL]: { order: 1 },
  [columnTypeCollapse.CREATED_AT]: { order: 2 },
  [columnTypeCollapse.ACTION]: { order: 3, align: 'center' },
};

export const columnLabelCollapse: ITypeColumnLabel = {
  [columnTypeCollapse.EMAIL]: 'E-mail',
  [columnTypeCollapse.CREATED_AT]: 'Criação',
  [columnTypeCollapse.ACTION]: 'Ações',
};

// Table Filter --------------------------

export const filterTable: IRenderInputSearch[] = [
  { searchPropertName: columnType.NAME, placeholder: 'nome', type: 'string' },
  { searchPropertName: columnType.ROLE, placeholder: 'acesso', type: 'roleUser' },
  {
    searchPropertName: columnType.UPDATED_AT,
    placeholder: 'Atualização (dd/mm/aaaa)',
    type: 'timestamp',
  },

  { searchPropertName: columnTypeCollapse.EMAIL, placeholder: 'e-mail', type: 'string' },
  {
    searchPropertName: columnTypeCollapse.CREATED_AT,
    placeholder: 'Criação (dd/mm/aaaa)',
    type: 'timestamp',
  },
];
