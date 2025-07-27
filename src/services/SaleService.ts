
import api from './api';

export interface Sale {
  id: number;
  invoice_number: string;
  sale_date: string;
  customer: {
    name: string;
  };
  total_amount: number;
  payment_status: string;
}

export interface SaleApiResponse {
  data: Sale[];
  last_page: number;
  current_page: number;
  from: number;
  to: number;
  total: number;
}

export const getSales = async (page = 1, limit = 10, sortCol = 'created_at', sortDir = 'desc'): Promise<SaleApiResponse> => {
  const response = await api.get(`/sale?perPage=${limit}&page=${page}&sort_by=${sortCol}&sort_direction=${sortDir}`);
  return response.data.results;
};

export const getSale = async (id: string) => {
    const response = await api.get(`/sale/${id}`);
    return response.data.results;
};

export const getNextInvoiceNumber = async () => {
    const response = await api.get('/sale/next-invoice-number');
    return response.data.results;
};

export const addSale = async (sale: any) => {
    const response = await api.post('/sale', sale);
    return response.data;
};

export const updateSale = async (id: string, sale: any) => {
    const response = await api.put(`/sale/${id}`, sale);
    return response.data;
};
