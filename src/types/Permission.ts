import { User } from "./User";

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