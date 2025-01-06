import Cookies from 'js-cookie';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.yourbackend.com';

const getToken = () => {
  const token = Cookies.get('auth_token');

  if (!token) {
    window.location.href = '/'; // Redirect to homepage if no token
  }

  return token;
};

const getHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const handleResponse = async (response) => {
  if (response.status === 401) {
    window.location.href = '/'; // Redirect to homepage on unauthorized
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(),
      cache: 'no-store',
    });

    return handleResponse(res);
  },

  post: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  put: async (endpoint, data) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    return handleResponse(res);
  },
};
