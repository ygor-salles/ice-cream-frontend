export interface IProviderDTO {
  id?: number;
  name: string;
  phone?: string;
  its_ice_cream_shoop: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface IFormProvider {
  id?: number;
  name: string;
  phone: string;
  its_ice_cream_shoop: boolean;
}

export enum EnumTypeProvider {
  PROVIDER = 'Fornecedor da sorveteria',
  EMPLOYEE = 'Funcionário da sorveteria',
  OTHER = 'Outro(não relacionado a sorveteria)',
}
