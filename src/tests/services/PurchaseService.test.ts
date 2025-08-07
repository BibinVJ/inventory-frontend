import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPurchases, getPurchase, getNextPurchaseInvoiceNumber, addPurchase, updatePurchase, voidPurchase } from '../../services/PurchaseService';
import api from '../../services/api';
import { Purchase, PurchasePayload } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockPurchase: Purchase = {
  id: 1,
  invoice_number: 'INV-001',
  vendor_id: 1,
  purchase_date: '2024-01-01',
  total_amount: 100,
  status: 'completed',
  items: [],
};

describe('PurchaseService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch purchases', async () => {
    const response = { results: [mockPurchase] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getPurchases();

    expect(mockedApi.get).toHaveBeenCalledWith('/purchase?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should fetch a single purchase', async () => {
    const response = { results: mockPurchase };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getPurchase('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/purchase/1');
    expect(result).toEqual(response.results);
  });

  it('should fetch the next purchase invoice number', async () => {
    const response = { results: 'INV-002' };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getNextPurchaseInvoiceNumber();

    expect(mockedApi.get).toHaveBeenCalledWith('/purchase/next-invoice-number');
    expect(result).toEqual(response.results);
  });

  it('should add a purchase', async () => {
    const newPurchase: PurchasePayload = { vendor_id: 2, purchase_date: '2024-02-01', items: [] };
    mockedApi.post.mockResolvedValue({ data: { results: newPurchase } });

    const result = await addPurchase(newPurchase);

    expect(mockedApi.post).toHaveBeenCalledWith('/purchase', newPurchase);
    expect(result).toEqual({ results: newPurchase });
  });

  it('should update a purchase', async () => {
    const updatedPurchase: PurchasePayload = { vendor_id: 3, purchase_date: '2024-03-01', items: [] };
    mockedApi.put.mockResolvedValue({ data: { results: updatedPurchase } });

    const result = await updatePurchase('1', updatedPurchase);

    expect(mockedApi.put).toHaveBeenCalledWith('/purchase/1', updatedPurchase);
    expect(result).toEqual({ results: updatedPurchase });
  });

  it('should void a purchase', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await voidPurchase(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/purchase/1');
  });
});
