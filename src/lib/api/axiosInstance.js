import axios from 'axios';
import { parseCookies } from 'nookies';

const axiosInstance = () => {
  const cookies = parseCookies();
  const userData = cookies.userData ? JSON.parse(cookies.userData) : {};
  const authToken = userData?.token?.trim();
  console.log('authTokenm', authToken);
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'Content-Type': 'application/json',
    },
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
