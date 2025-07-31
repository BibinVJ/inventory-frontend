export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
}

export interface CustomerApiResponse {
  results: Customer[];
  count: number;
}
