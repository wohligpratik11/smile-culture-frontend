import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endpoints';

const apiService = {
  get: async (url, params) => {
    const axios = axiosInstance();
    return axios.get(url, { params });
  },

  post: async (url, data, headers = {}) => {
    const axios = axiosInstance();
    return axios.post(url, data, {
      headers: {
        ...headers,
        ...(data instanceof FormData && {
          'Content-Type': 'multipart/form-data',
        }),
      },
    });
  },

  put: async (url, data, headers = {}) => {
    const axios = axiosInstance();
    return axios.put(url, data, {
      headers: {
        ...headers,
        ...(data instanceof FormData && {
          'Content-Type': 'multipart/form-data',
        }),
      },
    });
  },

  delete: async (url) => {
    const axios = axiosInstance();
    return axios.delete(url);
  },
};

export { API_ENDPOINTS, apiService };
