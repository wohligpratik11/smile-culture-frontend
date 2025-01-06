// services/api.js
import { api } from '../utils/api';

export const apiService = {
  // Movies
  movies: {
    getAll: () => api.get('/api/movies/getAllMoviesList'),
    getById: (id) => api.get(`/api/movies/${id}`),
    create: (data) => api.post('/api/movies', data),
    update: (id, data) => api.put(`/api/movies/${id}`, data),
    delete: (id) => api.delete(`/api/movies/${id}`),
  },

  // Auth
  auth: {
    login: (data) => api.post('/api/login/login', data),
  },

  // Users
  users: {
    getProfile: () => api.get('/api/users/profile'),
    updateProfile: (data) => api.put('/api/users/profile', data),
  },
};
