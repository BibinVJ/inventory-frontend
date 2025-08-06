import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPermissions } from '../../services/PermissionService';
import api from '../../services/api';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('PermissionService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch permissions', async () => {
    const response = { results: ['read', 'write', 'delete'] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getPermissions();

    expect(mockedApi.get).toHaveBeenCalledWith('/permissions');
    expect(result).toEqual(response.results);
  });
});
