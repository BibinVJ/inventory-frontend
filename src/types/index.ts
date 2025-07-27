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
  roles: Role[];
  permissions: Permission[];
  created_at: string;
}

export interface Role {
  id: number;
  name: string;
  is_active: boolean;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}

export interface UserApiResponse {
    data: User[];
    last_page: number;
    current_page: number;
    from: number;
    to: number;
    total: number;
}

export interface RoleApiResponse {
    data: Role[];
    last_page: number;
    current_page: number;
    from: number;
    to: number;
    total: number;
}
