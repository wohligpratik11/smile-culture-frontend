import axiosInstance from './axiosInstance';
import { API_ENDPOINTS } from './endpoints';
import { getHeaders } from '../../utils/getHeaders'; // Import the utility

const apiService = {
  get: async (url, params) => {
    const axios = axiosInstance();
    return axios.get(url, { params });
  },

  post: async (url, data, headers = {}) => {
    const axios = axiosInstance();
    const finalHeaders = getHeaders(data, headers); // Use the utility to get headers
    return axios.post(url, data, { headers: finalHeaders });
  },

  put: async (url, data, headers = {}) => {
    const axios = axiosInstance();
    const finalHeaders = getHeaders(data, headers); // Use the utility to get headers
    return axios.put(url, data, { headers: finalHeaders });
  },

  delete: async (url) => {
    const axios = axiosInstance();
    return axios.delete(url);
  },
};

export { API_ENDPOINTS, apiService };
