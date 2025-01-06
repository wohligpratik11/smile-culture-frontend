import { parseCookies, setCookie, destroyCookie } from 'nookies';

export const getAuthToken = () => {
  const cookies = parseCookies();
  return cookies.auth_token || null;
};

export const setAuthToken = (token) => {
  setCookie(null, 'auth_token', token, {
    path: '/',
    // secure: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'development',
    httpOnly: true,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const removeAuthToken = () => {
  destroyCookie(null, 'auth_token', { path: '/' });
};
