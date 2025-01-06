import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getAuthToken = () => {
  const cookies = parseCookies();
  return cookies.auth_token || null;
};

export const setAuthToken = (token) => {
  setCookie(null, 'auth_token', token, { path: '/' });
};

export const removeAuthToken = () => {
  destroyCookie(null, 'auth_token');
};
