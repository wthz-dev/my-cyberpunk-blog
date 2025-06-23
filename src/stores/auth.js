import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Support both new and old token format
    accessToken: localStorage.getItem('accessToken') || localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    userRole: (state) => state.user?.role || null,
    userName: (state) => state.user?.email?.split('@')[0] || 'แอดมิน'
  },
  
  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await api.post('/auth/login', { email, password });
        
        this.setAuthData(response.data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน';
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },
    
    async refreshToken() {
      if (!this.refreshToken) {
        throw new Error('ไม่พบ refresh token');
      }
      
      try {
        const response = await api.post('/auth/refresh', {
          refreshToken: this.refreshToken
        }, {
          // Skip the auth interceptor to avoid infinite loop
          headers: { 'Authorization': '' }
        });
        
        this.setAuthData(response.data);
        return response.data;
      } catch (error) {
        this.logout();
        throw new Error('การต่ออายุ token ล้มเหลว กรุณาเข้าสู่ระบบใหม่');
      }
    },
    
    async fetchUserInfo() {
      if (!this.accessToken) {
        return null;
      }
      
      try {
        const response = await api.get('/auth/me');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
      }
    },
    
    setAuthData(data) {
      // Handle different API response formats
      this.accessToken = data.token || data.accessToken;
      this.refreshToken = data.refreshToken;
      this.user = data.user || null;
      
      // console.log('Auth data received:', { 
      //   token: this.accessToken, 
      //   refreshToken: this.refreshToken, 
      //   user: this.user 
      // });
      
      // Save to localStorage
      if (this.accessToken) {
        localStorage.setItem('accessToken', this.accessToken);
        // For backward compatibility
        localStorage.setItem('token', this.accessToken);
      }
      
      if (this.refreshToken) {
        localStorage.setItem('refreshToken', this.refreshToken);
      }
      
      if (this.user) {
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
    
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;
      this.error = null;
      
      // Clear localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Remove old token format for compatibility
    }
  }
});
