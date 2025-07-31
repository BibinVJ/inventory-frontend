export interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
}

export interface VendorApiResponse {
  results: Vendor[];
  count: number;
}
