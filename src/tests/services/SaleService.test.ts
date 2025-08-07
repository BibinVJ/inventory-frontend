import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getSales, getSale, getNextInvoiceNumber, addSale, updateSale, voidSale } from '../../services/SaleService';
import api from '../../services/api';
import { Sale, SalePayload } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockSale: Sale = {
  id: 1,
  invoice_number: 'INV-001',
  customer_id: 1,
  sale_date: '2024-01-01',
  total_amount: 100,
  status: 'completed',
  items: [],
};

describe('SaleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch sales', async () => {
    const response = { results: [mockSale] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getSales();

    expect(mockedApi.get).toHaveBeenCalledWith('/sale?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should fetch a single sale', async () => {
    const response = { results: mockSale };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getSale('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/sale/1');
    expect(result).toEqual(response.results);
  });

  it('should fetch the next sale invoice number', async () => {
    const response = { results: 'INV-002' };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getNextInvoiceNumber();

    expect(mockedApi.get).toHaveBeenCalledWith('/sale/next-invoice-number');
    expect(result).toEqual(response.results);
  });

  it('should add a sale', async () => {
    const newSale: SalePayload = { customer_id: 2, sale_date: '2024-02-01', items: [] };
    mockedApi.post.mockResolvedValue({ data: { results: newSale } });

    const result = await addSale(newSale);

    expect(mockedApi.post).toHaveBeenCalledWith('/sale', newSale);
    expect(result).toEqual({ results: newSale });
  });

  it('should update a sale', async () => {
    const updatedSale: SalePayload = { customer_id: 3, sale_date: '2024-03-01', items: [] };
    mockedApi.put.mockResolvedValue({ data: { results: updatedSale } });

    const result = await updateSale('1', updatedSale);

    expect(mockedApi.put).toHaveBeenCalledWith('/sale/1', updatedSale);
    expect(result).toEqual({ results: updatedSale });
  });

  it('should void a sale', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await voidSale(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/sale/1');
  });
});
