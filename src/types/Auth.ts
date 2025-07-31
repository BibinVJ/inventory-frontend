import { User } from './User';

export interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => Promise<any>;
  logout: () => void;
  loading: boolean;
  fetchProfile: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
}