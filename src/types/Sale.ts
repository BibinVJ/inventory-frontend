export interface Sale {
  id: number;
  customer: number;
  sale_date: string;
  total_amount: number;
  status: string;
  is_active: boolean;
}

export interface SaleApiResponse {
  results: Sale[];
  count: number;
}
