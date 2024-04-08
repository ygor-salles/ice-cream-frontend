export interface ICreateCombinationDTORequest {
  name: string;
  price: number;
}

export interface ICreateCombinationDTOResponse {
  id: number;
  name: string;
  price: number;
  created_at: string;
  updated_at: string;
}
