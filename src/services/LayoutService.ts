import api from './api';

export const getLayout = () => {
  return api.get('/dashboard/layout');
};

export const saveLayout = (layouts: any[]) => {
  return api.post('/dashboard/layout', { layouts });
};
