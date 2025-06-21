<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1 class="dashboard-title">ADMIN DASHBOARD</h1>
      <button @click="handleLogout" class="logout-button">
        ออกจากระบบ
      </button>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-card">
        <h2 class="card-title">ยินดีต้อนรับ, {{ username }}</h2>
        <p class="card-subtitle">คุณได้เข้าสู่ระบบแอดมินของ Cyberpunk Blog เรียบร้อยแล้ว</p>
      </div>
      
      <div class="dashboard-grid">
        <div class="dashboard-card action-card">
          <div class="card-icon">📝</div>
          <h3>จัดการบทความ</h3>
          <p>เพิ่ม แก้ไข หรือลบบทความในบล็อก</p>
          <button class="action-button" @click="router.push('/admin/posts')">จัดการ</button>
        </div>
        
        <div class="dashboard-card action-card">
          <div class="card-icon">🏷️</div>
          <h3>จัดการแท็ก</h3>
          <p>เพิ่ม แก้ไข หรือลบแท็กสำหรับบทความ</p>
          <button class="action-button" @click="router.push('/admin/tags')">จัดการ</button>
        </div>
        
        <div class="dashboard-card action-card">
          <div class="card-icon">👤</div>
          <h3>จัดการผู้ใช้</h3>
          <p>จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</p>
          <button class="action-button" @click="router.push('/admin/users')">จัดการ</button>
        </div>
        
        <div class="dashboard-card action-card">
          <div class="card-icon">⚙️</div>
          <h3>ตั้งค่าเว็บไซต์</h3>
          <p>ปรับแต่งการตั้งค่าทั่วไปของเว็บไซต์</p>
          <button class="action-button">จัดการ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'AdminDashboard',
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    
    // Use computed property to get username from store
    const username = computed(() => authStore.userName);

    onMounted(async () => {
      // Check if user is logged in
      if (!authStore.isAuthenticated) {
        router.push('/admin/login');
        return;
      }
      
      // Fetch latest user info
      try {
        await authStore.fetchUserInfo();
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    });

    const handleLogout = () => {
      authStore.logout();
      router.push('/admin/login');
    };

    return {
      username,
      handleLogout,
      router
    };
  }
};
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #fff;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 255, 255, 0.3);
}

.dashboard-title {
  font-size: 2.5rem;
  color: #fff;
  text-shadow: 
    0 0 5px #ff00ff,
    0 0 10px #ff00ff;
  margin: 0;
}

.logout-button {
  background-color: transparent;
  border: 1px solid #ff0055;
  color: #ff0055;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover {
  background-color: rgba(255, 0, 85, 0.1);
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.5);
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-card {
  background-color: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(0, 255, 255, 0.3);
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.1);
}

.card-title {
  color: #00ffff;
  margin-top: 0;
  font-size: 1.8rem;
}

.card-subtitle {
  color: #aaa;
  font-size: 1.1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  border-color: #ff00ff;
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.action-button {
  margin-top: auto;
  background-color: transparent;
  border: 1px solid #00ffff;
  color: #00ffff;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
}

.action-button:hover {
  background-color: rgba(0, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}
</style>
