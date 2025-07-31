export interface Unit {
  id: number;
  name: string;
  code: string;
  description: string;
  is_active: boolean;
}

export interface UnitApiResponse {
  results: Unit[];
  count: number;
}
