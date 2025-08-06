import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../services/CategoryService';
import api from '../../services/api';
import { Category } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockCategory: Category = {
  id: 1,
  name: 'Test Category',
  description: 'Test Description',
  is_active: true,
};

describe('CategoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch categories', async () => {
    const response = { results: [mockCategory] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getCategories();

    expect(mockedApi.get).toHaveBeenCalledWith('/category?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should add a category', async () => {
    const newCategory = { name: 'New Category', description: 'New Description', is_active: true };
    mockedApi.post.mockResolvedValue({ data: { results: newCategory } });

    const result = await addCategory(newCategory);

    expect(mockedApi.post).toHaveBeenCalledWith('/category', newCategory);
    expect(result).toEqual({ results: newCategory });
  });

  it('should update a category', async () => {
    const updatedCategory = { name: 'Updated Category', description: 'Updated Description', is_active: false };
    mockedApi.put.mockResolvedValue({ data: { results: updatedCategory } });

    const result = await updateCategory(1, updatedCategory);

    expect(mockedApi.put).toHaveBeenCalledWith('/category/1', updatedCategory);
    expect(result).toEqual({ results: updatedCategory });
  });

  it('should delete a category', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteCategory(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/category/1');
  });
});
