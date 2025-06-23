import axios from 'axios';
import { getActivePinia } from 'pinia';
import progress from '@/utils/progress';

const apiUrl = import.meta.env.VITE_API_URL + "/api";

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Progress bar for API requests
let requestsInProgress = 0;

api.interceptors.request.use(
  (config) => {
    if (config.url === '/auth/refresh') {
      return config;
    }
    // Show progress bar on first request
    if (requestsInProgress === 0) {
      progress.start();
    }
    requestsInProgress++;

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
    requestsInProgress--;
    if (requestsInProgress <= 0) {
      progress.finish();
      requestsInProgress = 0;
    }
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
      }
    }
    return Promise.reject(error);
  }
);

export default api;
