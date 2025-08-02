import { Role } from "./Role";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  phone: string | null;
  phone_verified_at?: string | null;
  status: string;
  status_updated_at?: string;
  profile_image: string | null;
  is_admin: boolean;
  role: Role;
  permission_names: string[];
  created_at: string;
}

export interface UserApiResponse {
  data: User[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}

export type UserUpdatePayload = Partial<Pick<User, 'name' | 'email' | 'phone' | 'status'>> & {
  role_id?: number;
};
