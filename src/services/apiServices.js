// apiServices.js
import axios from 'axios';
import { useRouter } from 'next/router';

const handle401Error = () => {
  localStorage.clear();
  const router = useRouter();
  router.push('/sign-in');
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      handle401Error();
    }
    return Promise.reject(error);
  }
);

const ApiCaller = () => {
  const apiCall = async (httpType, url, data, options = {}) => {
    let headers;
    if (localStorage.getItem('bearerToken')) {
      headers = {
        Authorization: localStorage.getItem('bearerToken'),
      };
    }

    try {
      let response;
      switch (httpType.trim().toLowerCase()) {
        case 'get':
          response = await axios.get(url, { headers });
          break;
        case 'post':
          response = await axios.post(url, data, { headers });
          break;
        case 'put':
          response = await axios.put(url, data, { ...options, headers });
          break;
        case 'delete':
          response = await axios.delete(url, { ...options, headers, data });
          break;
        default:
          throw new Error('Invalid HTTP method provided');
      }

      return response;
    } catch (error) {
      if (error?.response?.status === 401) {
        handle401Error();
      }
      return error.response;
    }
  };

  return { apiCall };
};

export default ApiCaller;
