import axios from "axios";

export const getDashboardData = async () => {
  return axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`);
};
