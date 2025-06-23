import axios from 'axios';
import { getActivePinia } from 'pinia';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    if (config.url === '/auth/refresh') {
      return config;
    }
    
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/auth/refresh'
    ) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
       
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await api.post('/auth/refresh', { refreshToken });

        const accessToken = response.data.accessToken;
        const newRefreshToken = response.data.newRefreshToken;

        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        const pinia = getActivePinia();
        if (pinia) {
          const stores = pinia._s;
          const authStore = stores.get('auth');
          if (authStore) {
            authStore.accessToken = accessToken;
            authStore.refreshToken = newRefreshToken;
          }
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.error('[auth] Refresh token error:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        window.location.href = '/admin/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
