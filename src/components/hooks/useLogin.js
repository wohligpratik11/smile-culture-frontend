// hooks/useLogin.jsx
import { useEffect } from 'react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import Cookies from 'js-cookie';

export const useLogin = () => {
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await apiService.post(API_ENDPOINTS.LOGIN, {
          user_email: 'pratik.sawant@gmail.in',
          password: '1234',
        });
        Cookies.set('userData', JSON.stringify(response.data?.data));
      } catch (error) {
        console.error('Login API Error:', error);
      }
    };

    const userData = Cookies.get('userData');
    if (!userData || userData === 'undefined' || userData === 'null') {
      handleLogin();
    }
  }, []);
};
