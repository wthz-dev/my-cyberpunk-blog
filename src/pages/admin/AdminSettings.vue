<template>
  <div class="admin-settings-layout">
    <div class="admin-settings-row">
      <AdminMenu class="mt-8" />
      <div class="admin-settings-container">
        <CyberpunkAlert v-if="error" :message="error" type="error" :visible="!!error" @close="error = ''" />
        <CyberpunkAlert v-if="success" message="บันทึกสำเร็จ" type="success" :visible="success" @close="success = false" />
        <h1>ตั้งค่าเว็บไซต์</h1>
        <form @submit.prevent="onSave" class="settings-form">
      <div class="form-group">
        <label>ชื่อเว็บไซต์</label>
        <input v-model="form.siteName" type="text" required />
      </div>
      <div class="form-group">
        <label>คำอธิบาย</label>
        <textarea v-model="form.siteDescription" rows="2" />
      </div>
      <div class="form-group">
        <label>โลโก้ (URL)</label>
        <input v-model="form.logoUrl" type="url" placeholder="https://..." />
      </div>
      <div class="form-group">
        <label>ธีมสี</label>
        <input v-model="form.themeColor" type="color" />
      </div>
      <div class="form-group">
        <label>Header Image (URL)</label>
        <input v-model="form.headerImageUrl" type="url" placeholder="https://..." />
      </div>
      <div class="form-group">
        <label><input type="checkbox" v-model="form.darkMode" /> เปิดโหมดมืด (Dark Mode)</label>
      </div>
      <div class="form-group">
        <label>Meta Title</label>
        <input v-model="form.metaTitle" type="text" />
      </div>
      <div class="form-group">
        <label>Meta Description</label>
        <textarea v-model="form.metaDescription" rows="2" />
      </div>
      <div class="form-group">
        <label>Meta Keywords</label>
        <input v-model="form.metaKeywords" type="text" />
      </div>
      <div class="form-group">
        <label>OG Image (URL)</label>
        <input v-model="form.ogImageUrl" type="url" placeholder="https://..." />
      </div>
      <div class="form-group">
        <label>Facebook URL</label>
        <input v-model="form.facebookUrl" type="url" placeholder="https://facebook.com/..." />
      </div>
      <div class="form-group">
        <label>Twitter URL</label>
        <input v-model="form.twitterUrl" type="url" placeholder="https://twitter.com/..." />
      </div>
      <div class="form-group">
        <label>LINE URL</label>
        <input v-model="form.lineUrl" type="url" placeholder="https://line.me/..." />
      </div>
      <div class="form-group">
        <label>อีเมลติดต่อ</label>
        <input v-model="form.contactEmail" type="email" />
      </div>
      <div class="form-group">
        <label>ข้อความลิขสิทธิ์ (Copyright)</label>
        <input v-model="form.copyrightText" type="text" />
      </div>
      <div class="form-group">
        <label>จำนวนโพสต์ต่อหน้า</label>
        <input v-model.number="form.postsPerPage" type="number" min="1" />
      </div>
      <div class="form-group">
        <label><input type="checkbox" v-model="form.showTags" /> แสดงแท็ก</label>
      </div>
      <div class="form-group">
        <label><input type="checkbox" v-model="form.showCategories" /> แสดงหมวดหมู่</label>
      </div>
      <div class="form-group">
        <label><input type="checkbox" v-model="form.enableComments" /> เปิดคอมเมนต์</label>
      </div>
      <div class="form-group">
        <label>Analytics ID</label>
        <input v-model="form.analyticsId" type="text" />
      </div>
      <div class="form-group">
        <label><input type="checkbox" v-model="form.enableBanner" /> แสดงแบนเนอร์แจ้งเตือน</label>
      </div>
      <div class="form-actions">
        <button type="submit" :disabled="loading">บันทึก</button>
        <button type="button" @click="onReset" :disabled="loading">รีเซ็ตค่าเริ่มต้น</button>
      </div>
      <div v-if="success" class="success-msg">บันทึกสำเร็จ</div>
      <div v-if="error" class="error-msg">{{ error }}</div>
            </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchSettings, updateSettings, resetSettings } from '@/services/settingsService';
import { useAuthStore } from '@/stores/auth';
import CyberpunkAlert from '@/components/CyberpunkAlert.vue';
import CyberpunkAlertConfirm from '@/components/CyberpunkAlertConfirm.vue';
import AdminMenu from '@/components/AdminMenu.vue';

const authStore = useAuthStore();

const form = ref({
  siteName: '',
  siteDescription: '',
  logoUrl: '',
  themeColor: '#00ffff',
  headerImageUrl: '',
  darkMode: false,
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
  ogImageUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  lineUrl: '',
  contactEmail: '',
  copyrightText: '',
  postsPerPage: 10,
  showTags: true,
  showCategories: true,
  enableComments: true,
  analyticsId: '',
  enableBanner: false
});
const loading = ref(false);
const success = ref(false);
const error = ref('');

const load = async () => {
  loading.value = true;
  error.value = '';
  try {
    const settings = await fetchSettings();
    Object.assign(form.value, settings);
  } catch (e) {
    error.value = 'โหลดค่าตั้งค่าไม่สำเร็จ';
  }
  loading.value = false;
};

const onSave = async () => {
  loading.value = true;
  error.value = '';
  success.value = false;
  try {
    await updateSettings(form.value);
    authStore.fetchUserInfo();
    success.value = true;
  } catch (e) {
    error.value = 'บันทึกไม่สำเร็จ';
  }
  loading.value = false;
};

const onReset = async () => {
  if (!confirm('ต้องการรีเซ็ตค่าทั้งหมดเป็นค่าเริ่มต้น?')) return;
  loading.value = true;
  error.value = '';
  success.value = false;
  try {
    await resetSettings();
    await load();
    success.value = true;
  } catch (e) {
    error.value = 'รีเซ็ตไม่สำเร็จ';
  }
  loading.value = false;
};

onMounted(load);
</script>

<style scoped>
.admin-settings-layout {
  min-height: 100vh;
  background: #10131a;
  display: flex;
  flex-direction: column;
}
.admin-settings-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2.5rem;
}
.admin-settings-container {
  max-width: 600px;
  width: 100%;
  margin: 0 0 2rem 0;
  background: #181c24;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 16px #00ffff33;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
@media (max-width: 900px) {
  .admin-settings-row {
    flex-direction: column;
    align-items: stretch;
    padding-top: 1rem;
  }
  .admin-settings-container {
    margin: 0 auto 1.5rem auto;
    max-width: 98vw;
    padding: 1.2rem 0.5rem 1.2rem 0.5rem;
  }
  .admin-menu {
    margin-right: 0;
    margin-bottom: 1.2rem;
    min-width: unset;
    flex-direction: row !important;
    gap: 0.8rem !important;
    justify-content: center;
    padding: 1rem 0.5rem 1rem 0.5rem;
  }
}

h1 {
  color: #00ffff;
  font-size: 1.7rem;
  margin-bottom: 2rem;
  letter-spacing: 1px;
  text-align: center;
}
.settings-form {
  width: 100%;
}
.settings-form .form-group {
  margin-bottom: 1.3rem;
}
.settings-form label {
  display: block;
  margin-bottom: 0.3rem;
  color: #00ffff;
  font-size: 1rem;
}
.settings-form input,
.settings-form textarea {
  width: 100%;
  padding: 0.55rem 0.8rem;
  border-radius: 7px;
  border: 1px solid #444;
  background: #22252b;
  color: #fff;
  font-size: 1rem;
}
.settings-form input[type="color"] {
  padding: 0.2rem;
  width: 60px;
  height: 36px;
}
.settings-form input[type="checkbox"] {
  width: 1.1em;
  height: 1.1em;
  margin-right: 0.4em;
}
.settings-form .form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
}
.settings-form button {
  padding: 0.55rem 2rem;
  border: none;
  border-radius: 7px;
  background: #00ffff;
  color: #181c24;
  font-weight: bold;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.18s;
}
.settings-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@media (max-width: 700px) {
  .admin-settings-container {
    padding: 1rem 0.5rem 1rem 0.5rem;
    max-width: 98vw;
  }
}
</style>
