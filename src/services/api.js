import axios from 'axios';
import { auth } from '../config/firebase';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token to all requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Task API calls
export const taskAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (task) => api.post('/tasks', task),
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  getTaskStats: () => api.get('/tasks/stats'),
  getTaskById: (id) => api.get(`/tasks/${id}`),
  shareTask: (id, email) => api.post(`/tasks/share/${id}`, { email }),
};

// Auth API calls
export const authAPI = {
  verifyToken: (token) => api.post('/auth/verify', { token }),
  refreshToken: () => api.post('/auth/refresh'),
};

export default api;