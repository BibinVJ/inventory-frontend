export interface Category {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface CategoryApiResponse {
  data: Category[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}
