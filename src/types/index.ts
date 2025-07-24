export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  provider?: string | null;
  provider_id?: string | null;
  status: 'active' | 'inactive' | 'suspended';
  status_updated_at?: string;
  profile_image: string | null;
  phone: string | null;
  phone_verified_at?: string | null;
  created_at: string;
  updated_at: string;
  // Add other fields that might be available
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
}
