export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
}

export interface VendorApiResponse {
  data: Vendor[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}
