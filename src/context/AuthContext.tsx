import { createContext, useContext, useEffect, useState } from "react";
import {
  getUser,
  storeUser,
  logout as logoutService,
  login as loginService,
} from "../services/AuthService";
import api from "../services/api";

type User = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
};

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => Promise<any>;
  logout: () => void;
  loading: boolean;
  fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser && storedUser.results.token.access_token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${storedUser.results.token.access_token}`;
      setUser(storedUser.results.user);
      fetchProfile();
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => {
    const data = await loginService(email, password);
    storeUser(data, stayLoggedIn);
    api.defaults.headers.common["Authorization"] = `Bearer ${data.results.token.access_token}`;
    setUser(data.results.user);
    return data.results.user;
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get("/profile");
      setUser(data.results);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
