// hooks/useLogin.jsx
import { useEffect } from 'react';
import { apiService, API_ENDPOINTS } from '../../lib/api/apiService';
import Cookies from 'js-cookie';

export const useLogin = () => {
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await apiService.post(API_ENDPOINTS.LOGIN, {
          user_email: 'pratik.sawant@wohlig.in',
          password: '123',
        });
        Cookies.set('userData', JSON.stringify(response.data?.data), {
          expires: 7,
        });
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
