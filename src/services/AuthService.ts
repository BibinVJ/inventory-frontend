import axios from "axios";

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, formData);
  return response.data;
};

export const storeToken = (token: string, persistent = false) => {
  if (persistent) {
    localStorage.setItem("token", token); // survives browser close
  } else {
    sessionStorage.setItem("token", token); // gone when tab closes
  }
};

export const getToken = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
};
