export interface ICreateCombinationDTORequest {
  name: string;
  price: number;
}

export interface ICreateCombinationDTOResponse {
  id: number;
  name: string;
  price: number;
  created_at: Date;
  updated_at: Date;
}
