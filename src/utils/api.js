import Cookies from 'js-cookie';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.yourbackend.com';

// Simple function to get the token (only for SSR, assume client will handle cookies separately)
const getToken = (req) => {
  if (req) {
    // On server-side, get token from cookies (in SSR context)
    return req.cookies.auth_token || ''; // Replace 'auth_token' with your cookie name
  } else {
    // On client-side, use js-cookie
    return Cookies.get('auth_token') || '';
  }
};

const getHeaders = (req) => {
  const token = getToken(req);
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

// API helper methods (GET, POST, PUT, DELETE)
export const api = {
  get: async (endpoint, req) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: getHeaders(req),
      cache: 'no-store',
    });

    return handleResponse(res);
  },

  post: async (endpoint, data, req) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getHeaders(req),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  put: async (endpoint, data, req) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: getHeaders(req),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (endpoint, req) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: getHeaders(req),
    });

    return handleResponse(res);
  },
};
