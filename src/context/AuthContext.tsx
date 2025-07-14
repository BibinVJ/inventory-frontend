import { createContext, useContext, useEffect, useState } from "react";
import {
  getToken,
  storeToken,
  logout as logoutService,
} from "../services/AuthService";
import axios from "axios";

type User = any;

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => Promise<any>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // for refresh check

  useEffect(() => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Fetch the current user
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/profile`)
        .then((res) => {
          setUser(res.data.results);
        })
        .catch(() => {
          logoutService();
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    stayLoggedIn: boolean
  ) => {
    const data = await import("../services/AuthService").then((mod) =>
      mod.login(email, password)
    );
    const token = data.results.token.access_token;
    storeToken(token, stayLoggedIn);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(data.results.user);
    return data.results.user;
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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
