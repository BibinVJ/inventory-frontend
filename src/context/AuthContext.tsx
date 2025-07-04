import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  status: string;
  status_updated_at: string | null;
  is_admin: boolean;
  role_names: string[];
  permissions: string[];
  profile_image: string | null;
  phone: string | null;
  phone_verified_at: string | null;
}

interface Token {
  access_token: string;
  expires_in: number;
}

interface AuthContextType {
  user: User | null;
  token: Token | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<Token | null>(null);

  useEffect(() => {
    // Load auth state from localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(\`\${import.meta.env.VITE_API_BASE_URL}/api/login\`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || "Login error");
    }

    setUser(data.results.user);
    setToken(data.results.token);

    localStorage.setItem("user", JSON.stringify(data.results.user));
    localStorage.setItem("token", JSON.stringify(data.results.token));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
