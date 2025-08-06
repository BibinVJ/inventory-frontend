import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getItems, getItem, addItem, updateItem, deleteItem } from '../../services/ItemService';
import api from '../../services/api';
import { Item } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockItem: Item = {
  id: 1,
  sku: 'TEST-001',
  name: 'Test Item',
  category_id: '1',
  unit_id: '1',
  description: 'Test Description',
  is_active: true,
  type: 'product',
};

describe('ItemService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch items', async () => {
    const response = { results: [mockItem] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getItems();

    expect(mockedApi.get).toHaveBeenCalledWith('/item?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should fetch a single item', async () => {
    const response = { results: mockItem };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getItem('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/item/1');
    expect(result).toEqual(response.results);
  });

  it('should add an item', async () => {
    const newItem = { sku: 'NEW-001', name: 'New Item', category_id: '2', unit_id: '2', description: 'New Description', is_active: true, type: 'service' };
    mockedApi.post.mockResolvedValue({ data: { results: newItem } });

    const result = await addItem(newItem);

    expect(mockedApi.post).toHaveBeenCalledWith('/item', newItem);
    expect(result).toEqual({ results: newItem });
  });

  it('should update an item', async () => {
    const updatedItem = { sku: 'UPD-001', name: 'Updated Item', category_id: '3', unit_id: '3', description: 'Updated Description', is_active: false, type: 'product' };
    mockedApi.put.mockResolvedValue({ data: { results: updatedItem } });

    const result = await updateItem(1, updatedItem);

    expect(mockedApi.put).toHaveBeenCalledWith('/item/1', updatedItem);
    expect(result).toEqual({ results: updatedItem });
  });

  it('should delete an item', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteItem(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/item/1');
  });
});
