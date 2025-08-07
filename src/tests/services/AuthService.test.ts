import { describe, it, expect, vi } from 'vitest';
import { login, logout, storeUser, getUser } from '../../services/AuthService';
import api from '../../services/api';
import { User } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  permission_names: ['read', 'write'],
};

const userData = {
  results: {
    user: mockUser,
    token: {
      access_token: 'test_token',
    },
  },
};

describe('AuthService', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    // Mock localStorage
    Storage.prototype.setItem = vi.fn();
    Storage.prototype.getItem = vi.fn();
    Storage.prototype.removeItem = vi.fn();
  });

  it('should call login API and return user data', async () => {
    mockedApi.post.mockResolvedValue({ data: userData });

    const result = await login('test@example.com', 'password');

    expect(mockedApi.post).toHaveBeenCalledWith('/login', expect.any(FormData));
    expect(result).toEqual(userData);
  });

  it('should call logout API', async () => {
    localStorage.getItem.mockReturnValue('test_token');
    mockedApi.post.mockResolvedValue({});
    await logout();
    expect(mockedApi.post).toHaveBeenCalledWith('/logout');
  });

  it('should store user data in localStorage', () => {
    storeUser(userData, true);
    expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userData));
  });

  it('should store user data in sessionStorage', () => {
    storeUser(userData, false);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(userData));
  });

  it('should get user data from localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify(userData));
    const result = getUser();
    expect(localStorage.getItem).toHaveBeenCalledWith('user');
    expect(result).toEqual(userData);
  });
});
