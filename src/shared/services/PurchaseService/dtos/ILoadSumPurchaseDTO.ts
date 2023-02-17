export interface ILoadSumPurchaseDTORequest {
  startDate: string;
  endDate: string;
  its_ice_cream_shoop?: boolean;
  provider_id?: number;
}

export interface ILoadSumPurchaseDTOResponse {
  total_purchases: number;
}
