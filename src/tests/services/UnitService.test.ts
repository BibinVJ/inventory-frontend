import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUnits, addUnit, updateUnit, deleteUnit } from '../../services/UnitService';
import api from '../../services/api';
import { Unit } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockUnit: Unit = {
  id: 1,
  name: 'Test Unit',
  code: 'TU',
  description: 'Test Description',
  is_active: true,
};

describe('UnitService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch units', async () => {
    const response = { results: [mockUnit] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getUnits();

    expect(mockedApi.get).toHaveBeenCalledWith('/unit?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should add a unit', async () => {
    const newUnit = { name: 'New Unit', code: 'NU', description: 'New Description', is_active: true };
    mockedApi.post.mockResolvedValue({ data: { results: newUnit } });

    const result = await addUnit(newUnit);

    expect(mockedApi.post).toHaveBeenCalledWith('/unit', newUnit);
    expect(result).toEqual({ results: newUnit });
  });

  it('should update a unit', async () => {
    const updatedUnit = { name: 'Updated Unit', code: 'UU', description: 'Updated Description', is_active: false };
    mockedApi.put.mockResolvedValue({ data: { results: updatedUnit } });

    const result = await updateUnit(1, updatedUnit);

    expect(mockedApi.put).toHaveBeenCalledWith('/unit/1', updatedUnit);
    expect(result).toEqual({ results: updatedUnit });
  });

  it('should delete a unit', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteUnit(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/unit/1');
  });
});
