export interface ICombinationDTO {
  id?: number;
  name: string;
  price: number;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export interface IFormCombination {
  id?: number;
  name: string;
  price: string;
}
