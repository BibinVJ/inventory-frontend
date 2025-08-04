import { useEffect, useState, useCallback } from "react";
import {
  getUser,
  storeUser,
  logout as logoutService,
  login as loginService,
} from "../services/AuthService";
import api from "../services/api";

import { User } from "../types";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const { data } = await api.get("/profile");
      setUser(data.results);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }, []);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser && storedUser.results.token.access_token) {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedUser.results.token.access_token}`;
      setUser(storedUser.results.user);
      fetchProfile();
    }
    setLoading(false);
  }, [fetchProfile]);

  const login = useCallback(
    async (email: string, password: string, stayLoggedIn: boolean) => {
      const data = await loginService(email, password);
      storeUser(data, stayLoggedIn);
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.results.token.access_token}`;
      setUser(data.results.user);
      return data.results.user;
    },
    []
  );

  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false;
      return user.permission_names.includes(permission);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, fetchProfile, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

