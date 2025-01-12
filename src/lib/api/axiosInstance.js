import axios from 'axios';
import { parseCookies } from 'nookies';

const axiosInstance = (ctx = null) => {
  const cookies = parseCookies(ctx);
  const userData = cookies.userData ? JSON.parse(cookies.userData) : {};
  const authToken = userData?.token?.trim();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
    },
  });

  // Interceptor to set Content-Type based on the request data
  instance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      // Automatically set content type for FormData
      config.headers['Content-Type'] = 'multipart/form-data';
    } else {
      // Default Content-Type for JSON data
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosInstance;
