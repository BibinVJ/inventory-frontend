
import api from './api';

import { PurchaseApiResponse } from '../types';

export const getPurchases = async (page = 1, limit = 10, sortCol = 'created_at', sortDir = 'desc'): Promise<PurchaseApiResponse> => {
  const response = await api.get(`/purchase?perPage=${limit}&page=${page}&sort_by=${sortCol}&sort_direction=${sortDir}`);
  return response.data.results;
};

export const getPurchase = async (id: string) => {
    const response = await api.get(`/purchase/${id}`);
    return response.data.results;
};

export const getNextPurchaseInvoiceNumber = async () => {
    const response = await api.get('/purchase/next-invoice-number');
    return response.data.results;
};

export const addPurchase = async (purchase: any) => {
    const response = await api.post('/purchase', purchase);
    return response.data;
};

export const updatePurchase = async (id: string, purchase: any) => {
    const response = await api.put(`/purchase/${id}`, purchase);
    return response.data;
};

export const voidPurchase = async (id: number) => {
    const response = await api.delete(`/purchase/${id}`);
    return response.data;
};
