export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  profile_image?: string;
  total_spent?: number;
  is_active: boolean;
}

export interface CustomerApiResponse {
  data: Customer[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}
