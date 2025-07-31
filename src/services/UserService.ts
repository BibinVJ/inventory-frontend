import { UserApiResponse } from '../types/Permission';
import { User } from '../types/User';
import api from './api';

export const getUsers = async (page = 1, limit = 10, sortCol = 'created_at', sortDir = 'desc'): Promise<UserApiResponse> => {
  const response = await api.get(`/user?perPage=${limit}&page=${page}&sort_by=${sortCol}&sort_direction=${sortDir}`);
  return response.data.results;
};

export const getUser = async (id: string): Promise<User> => {
    const response = await api.get(`/user/${id}`);
    return response.data.results;
};

export const createUser = async (userData: Omit<User, 'id' | 'status' | 'is_admin' | 'permissions' | 'created_at' | 'email_verified_at' | 'phone_verified_at' | 'status_updated_at' | 'profile_image'>) => {
  const response = await api.post('/user', userData);
  return response.data;
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await api.put(`/user/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};
