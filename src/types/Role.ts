import { Permission } from "./Permission";

export interface Role {
  id: number;
  name: string;
  is_active: boolean;
  permissions: Permission[];
}

export interface RoleApiResponse {
  data: Role[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}
