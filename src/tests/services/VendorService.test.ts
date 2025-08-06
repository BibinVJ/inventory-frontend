import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getVendors, addVendor, updateVendor, deleteVendor } from '../../services/VendorService';
import api from '../../services/api';
import { Vendor } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockVendor: Vendor = {
  id: 1,
  name: 'Test Vendor',
  email: 'test@example.com',
  phone: '1234567890',
  address: 'Test Address',
  is_active: true,
};

describe('VendorService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch vendors', async () => {
    const response = { results: [mockVendor] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getVendors();

    expect(mockedApi.get).toHaveBeenCalledWith('/vendor?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should add a vendor', async () => {
    const newVendor = { name: 'New Vendor', email: 'new@example.com', phone: '0987654321', address: 'New Address', is_active: true };
    mockedApi.post.mockResolvedValue({ data: { results: newVendor } });

    const result = await addVendor(newVendor);

    expect(mockedApi.post).toHaveBeenCalledWith('/vendor', newVendor);
    expect(result).toEqual({ results: newVendor });
  });

  it('should update a vendor', async () => {
    const updatedVendor = { name: 'Updated Vendor', email: 'updated@example.com', phone: '1112223333', address: 'Updated Address', is_active: false };
    mockedApi.put.mockResolvedValue({ data: { results: updatedVendor } });

    const result = await updateVendor(1, updatedVendor);

    expect(mockedApi.put).toHaveBeenCalledWith('/vendor/1', updatedVendor);
    expect(result).toEqual({ results: updatedVendor });
  });

  it('should delete a vendor', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteVendor(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/vendor/1');
  });
});
