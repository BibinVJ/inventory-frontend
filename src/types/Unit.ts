export interface Unit {
  id: number;
  name: string;
  code: string;
  description: string;
  is_active: boolean;
}

export interface UnitApiResponse {
  data: Unit[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}
