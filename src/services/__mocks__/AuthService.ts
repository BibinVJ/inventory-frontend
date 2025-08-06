import { vi } from 'vitest';
import { User } from '../../types';

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  permission_names: ['read', 'write'],
};

export const login = vi.fn().mockResolvedValue({
  results: {
    user: mockUser,
    token: {
      access_token: 'test_token',
    },
  },
});

export const logout = vi.fn().mockResolvedValue(undefined);

export const getUser = vi.fn().mockReturnValue({
  results: {
    user: mockUser,
    token: {
      access_token: 'test_token',
    },
  },
});

export const storeUser = vi.fn();
