import axios from 'axios';
import { parseCookies } from 'nookies';

const axiosInstance = () => {
  const cookies = parseCookies();
  const authToken = cookies.auth_token;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base API URL
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json',
    },
  });

  // Add interceptors if needed
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
