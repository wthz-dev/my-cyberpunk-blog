<template>
  <div class="admin-login-container">
    <div class="login-card">
      <h1 class="login-title">ADMIN LOGIN</h1>
      <div class="neon-border">
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">อีเมล</label>
            <input 
              type="text" 
              id="email" 
              v-model="email" 
              placeholder="กรอกอีเมล"
              required
              class="cyberpunk-input"
            />
          </div>
          
          <div class="form-group">
            <label for="password">รหัสผ่าน</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="กรอกรหัสผ่าน"
              required
              class="cyberpunk-input"
            />
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            class="login-button" 
            :disabled="isLoading"
          >
            <span v-if="isLoading">กำลังเข้าสู่ระบบ...</span>
            <span v-else>เข้าสู่ระบบ</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'AdminLogin',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    const email = ref('torkait.s');
    const password = ref('10203040');
    
    // Use computed properties to access store state
    const error = computed(() => authStore.error);
    const isLoading = computed(() => authStore.loading);

    const handleLogin = async () => {
      try {
        await authStore.login(email.value, password.value);
        // Fetch user info after login
        await authStore.fetchUserInfo();
        // Redirect to admin dashboard after successful login
        router.push('/admin/dashboard');
      } catch (err) {
        // Error is already handled in the store
        console.error('Login error:', err);
      }
    };

    return {
      email,
      password,
      error,
      isLoading,
      handleLogin
    };
  }
};
</script>

<style scoped>
.admin-login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #0a0a0a;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="none" stroke="%23ff00ff" stroke-width="0.5" stroke-dasharray="5,5" /></svg>');
}

.login-card {
  width: 100%;
  max-width: 450px;
  padding: 2rem;
  background-color: rgba(10, 10, 10, 0.8);
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.login-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #fff;
  text-shadow: 
    0 0 5px #ff00ff,
    0 0 10px #ff00ff,
    0 0 20px #ff00ff;
  letter-spacing: 2px;
}

.neon-border {
  position: relative;
  padding: 2rem;
  border: 1px solid rgba(255, 0, 255, 0.5);
  box-shadow: 
    0 0 5px rgba(255, 0, 255, 0.5),
    0 0 10px rgba(255, 0, 255, 0.3) inset;
}

.neon-border::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #ff00ff, transparent, #00ffff, transparent, #ff00ff);
  background-size: 400%;
  z-index: -1;
  filter: blur(10px);
  animation: glowing 20s linear infinite;
}

@keyframes glowing {
  0% { background-position: 0 0; }
  50% { background-position: 400% 0; }
  100% { background-position: 0 0; }
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #00ffff;
  font-size: 1rem;
  letter-spacing: 1px;
}

.cyberpunk-input {
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.7);
  border: 1px solid #00ffff;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.cyberpunk-input:focus {
  outline: none;
  border-color: #ff00ff;
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.error-message {
  color: #ff0055;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 0, 85, 0.1);
  border-left: 3px solid #ff0055;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: transparent;
  border: 1px solid #ff00ff;
  color: #ff00ff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.3), transparent);
  transition: all 0.5s;
}

.login-button:hover {
  background-color: rgba(255, 0, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.login-button:hover::before {
  left: 100%;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
