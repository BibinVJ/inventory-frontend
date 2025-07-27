
import api from './api';

export interface Unit {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
}

export interface UnitApiResponse {
  data: Unit[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}

export const getUnits = async (page = 1, limit = 10, sortCol = 'created_at', sortDir = 'desc', unpaginated = false): Promise<UnitApiResponse> => {
  const url = unpaginated ? '/unit?unpaginated=1' : `/unit?perPage=${limit}&page=${page}&sort_by=${sortCol}&sort_direction=${sortDir}`;
  const response = await api.get(url);
  return response.data.results;
};

export const addUnit = async (unit: { name: string; code: string; description: string; is_active: boolean }) => {
  const response = await api.post('/unit', unit);
  return response.data;
};

export const updateUnit = async (id: number, unit: { name: string; code: string; description: string; is_active: boolean }) => {
  const response = await api.put(`/unit/${id}`, unit);
  return response.data;
};

export const deleteUnit = async (id: number) => {
  const response = await api.delete(`/unit/${id}`);
  return response.data;
};
