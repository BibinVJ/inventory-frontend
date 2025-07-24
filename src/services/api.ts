import axios from 'axios';
import NProgress from 'nprogress';
// import { toast } from 'sonner';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(config => {
  NProgress.start();
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(response => {
  NProgress.done();
  // if (response.data.message) {
  //   toast.success(response.data.message);
  // }
  return response;
}, error => {
  NProgress.done();
  // if (error.response?.data?.message) {
  //   toast.error(error.response.data.message);
  // }
  return Promise.reject(error);
});

export default api;
