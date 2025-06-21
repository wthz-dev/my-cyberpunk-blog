import axios from 'axios';
// Import pinia directly to avoid circular dependency
import { getActivePinia } from 'pinia';

// Base API URL - should be moved to environment variables in production
const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    // Skip adding token for refresh token requests to avoid circular dependency
    if (config.url === '/auth/refresh') {
      return config;
    }
    
    // Get token from localStorage directly to avoid circular dependency
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get refresh token from localStorage
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        // Call refresh token endpoint directly to avoid circular dependency
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken: refreshToken
        });
        
        const { token, refreshToken: newRefreshToken } = response.data;
        
        // Update tokens in localStorage
        if (token) {
          localStorage.setItem('accessToken', token);
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
        }
        
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }
        
        // Update store if pinia is available
        const pinia = getActivePinia();
        if (pinia) {
          // Find auth store in pinia
          const stores = pinia._s;
          const authStore = stores.get('auth');
          if (authStore) {
            authStore.accessToken = token;
            authStore.refreshToken = newRefreshToken;
          }
        }
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, clear tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/admin/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
