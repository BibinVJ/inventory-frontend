import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRoles, getRole, createRole, updateRole, deleteRole } from '../../services/RoleService';
import api from '../../services/api';
import { Role } from '../../types';

vi.mock('../../services/api');

const mockedApi = api as jest.Mocked<typeof api>;

const mockRole: Role = {
  id: 1,
  name: 'Test Role',
  permissions: [1, 2, 3],
  is_active: true,
};

describe('RoleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch roles', async () => {
    const response = { data: [mockRole] };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getRoles();

    expect(mockedApi.get).toHaveBeenCalledWith('/role?perPage=10&page=1&sort_by=created_at&sort_direction=desc');
    expect(result).toEqual(response);
  });

  it('should fetch a single role', async () => {
    const response = { data: mockRole };
    mockedApi.get.mockResolvedValue({ data: response });

    const result = await getRole('1');

    expect(mockedApi.get).toHaveBeenCalledWith('/role/1');
    expect(result).toEqual(response.data);
  });

  it('should create a role', async () => {
    const newRole = { name: 'New Role', permissions: [4, 5]};
    mockedApi.post.mockResolvedValue({ data: newRole });

    const result = await createRole(newRole);

    expect(mockedApi.post).toHaveBeenCalledWith('/role', newRole);
    expect(result).toEqual(newRole);
  });

  it('should update a role', async () => {
    const updatedRole = { name: 'Updated Role', permissions: [6, 7]};
    mockedApi.put.mockResolvedValue({ data: updatedRole });

    const result = await updateRole(1, updatedRole);

    expect(mockedApi.put).toHaveBeenCalledWith('/role/1', updatedRole);
    expect(result).toEqual(updatedRole);
  });

  it('should delete a role', async () => {
    mockedApi.delete.mockResolvedValue({ data: {} });

    await deleteRole(1);

    expect(mockedApi.delete).toHaveBeenCalledWith('/role/1');
  });
});
