// utils/getHeaders.js
export const getHeaders = (data, customHeaders = {}) => {
  if (data instanceof FormData) {
    return {
      ...customHeaders,
      'Content-Type': 'multipart/form-data',
    };
  }
  return customHeaders;
};
