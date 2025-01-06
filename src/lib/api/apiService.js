import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endpoints';

const apiService = {
  get: async (url, params) => {
    const axios = axiosInstance();
    return axios.get(url, { params });
  },

  post: async (url, data) => {
    const axios = axiosInstance();
    return axios.post(url, data);
  },

  put: async (url, data) => {
    const axios = axiosInstance();
    return axios.put(url, data);
  },

  delete: async (url) => {
    const axios = axiosInstance();
    return axios.delete(url);
  },
};

export { API_ENDPOINTS, apiService };
