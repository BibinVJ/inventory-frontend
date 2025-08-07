import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDashboardData } from '../../services/DashboardService';
import api from '../../services/api';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

describe('DashboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch dashboard data', async () => {
    const response = { data: { results: { sales: 100, purchases: 50 } } };
    mockedApi.get.mockResolvedValue(response);

    const result = await getDashboardData();

    expect(mockedApi.get).toHaveBeenCalledWith('/dashboard');
    expect(result).toEqual(response);
  });
});
