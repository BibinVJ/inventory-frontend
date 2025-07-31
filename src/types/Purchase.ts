export interface Purchase {
  id: number;
  vendor: number;
  purchase_date: string;
  total_amount: number;
  status: string;
  is_active: boolean;
}

export interface PurchaseApiResponse {
  results: Purchase[];
  count: number;
}
