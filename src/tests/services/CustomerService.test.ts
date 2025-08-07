import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from '../../services/CustomerService';
import api from '../../services/api';
import { Customer } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockCustomer: Customer = {
  id: 1,
  name: 'Test Customer',
  email: 'test@example.com',
  phone: '1234567890',
  address: 'Test Address',
  is_active: true,
};

describe('CustomerService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch customers', async () => {
    const response = { results: [mockCustomer] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getCustomers();

    expect(mockedApi.get).toHaveBeenCalledWith('/customer?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should add a customer', async () => {
    const newCustomer = { name: 'New Customer', email: 'new@example.com', phone: '0987654321', address: 'New Address', is_active: true };
    mockedApi.post.mockResolvedValue({ data: { results: newCustomer } });

    const result = await addCustomer(newCustomer);

    expect(mockedApi.post).toHaveBeenCalledWith('/customer', newCustomer);
    expect(result).toEqual({ results: newCustomer });
  });

  it('should update a customer', async () => {
    const updatedCustomer = { name: 'Updated Customer', email: 'updated@example.com', phone: '1112223333', address: 'Updated Address', is_active: false };
    mockedApi.put.mockResolvedValue({ data: { results: updatedCustomer } });

    const result = await updateCustomer(1, updatedCustomer);

    expect(mockedApi.put).toHaveBeenCalledWith('/customer/1', updatedCustomer);
    expect(result).toEqual({ results: updatedCustomer });
  });

  it('should delete a customer', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteCustomer(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/customer/1');
  });
});
