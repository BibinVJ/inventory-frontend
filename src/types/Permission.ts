export interface Permission {
  id: number;
  name: string;
}

export interface PermissionApiResponse {
  data: Permission[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}