import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../../services/UserService';
import api from '../../services/api';
import { User, UserUpdatePayload } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockUser: User = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  permission_names: [],
};

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch users', async () => {
    const response = { results: [mockUser] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getUsers();

    expect(mockedApi.get).toHaveBeenCalledWith('/user?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response.results);
  });

  it('should fetch a single user', async () => {
    const response = { results: mockUser };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getUser('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/user/1');
    expect(result).toEqual(response.results);
  });

  it('should create a user', async () => {
    const newUser = { name: 'New User', email: 'new@example.com' };
    mockedApi.post.mockResolvedValue({ data: { results: newUser } });

    const result = await createUser(newUser);

    expect(mockedApi.post).toHaveBeenCalledWith('/user', newUser);
    expect(result).toEqual({ results: newUser });
  });

  it('should update a user', async () => {
    const updatedUser: UserUpdatePayload = { name: 'Updated User' };
    mockedApi.put.mockResolvedValue({ data: { results: updatedUser } });

    const result = await updateUser(1, updatedUser);

    expect(mockedApi.put).toHaveBeenCalledWith('/user/1', updatedUser);
    expect(result).toEqual({ results: updatedUser });
  });

  it('should delete a user', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteUser(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/user/1');
  });
});
