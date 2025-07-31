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