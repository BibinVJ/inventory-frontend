import { useAuth } from '../context/AuthContext';

export const usePermissions = () => {
  const { hasPermission } = useAuth();
  return { hasPermission };
};
