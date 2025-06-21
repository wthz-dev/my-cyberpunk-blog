<template>
  <div class="admin-users-layout">
    <AdminMenu />
    <div class="admin-users-container">
    <CyberpunkAlert
      :message="alertMsg"
      :type="alertType"
      :visible="alertVisible"
      @close="alertVisible = false"
    />
    <CyberpunkAlertConfirm
      :visible="confirmVisible"
      :message="confirmMessage"
      type="warning"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
    <div class="admin-users-header">
      <h1>จัดการบัญชีผู้ใช้และสิทธิ์การเข้าถึง</h1>
      <button class="add-user-btn" @click="openAddUser">+ เพิ่มผู้ใช้ใหม่</button>
    </div>
    
    <div class="search-bar">
      <input v-model="search" placeholder="ค้นหาชื่อหรืออีเมล..." />
      <button @click="fetchUsers">ค้นหา</button>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <th>ชื่อ</th>
          <th>อีเมล</th>
          <th>บทบาท</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td>{{ user.name || '-' }}</td>
          <td>{{ user.email }}</td>
          <td>
            <select v-model="user.role" @change="changeRole(user)">
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </td>
          <td>
            <button class="edit-btn" @click="openEditUser(user)">แก้ไข</button>
            <button class="delete-btn" @click="askDeleteUser(user.id)">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="pagination">
      <button @click="prevPage" :disabled="page === 1">ก่อนหน้า</button>
      <span>หน้า {{ page }}</span>
      <button @click="nextPage" :disabled="!hasMore">ถัดไป</button>
    </div>

    <!-- Modal ฟอร์มเพิ่ม/แก้ไขผู้ใช้ -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ editMode ? 'แก้ไขผู้ใช้' : 'เพิ่มผู้ใช้ใหม่' }}</h2>
        <form @submit.prevent="editMode ? updateUser() : addUser()">
          <div class="form-group">
            <label>ชื่อ</label>
            <input v-model="userForm.name" type="text" required />
          </div>
          <div class="form-group">
            <label>อีเมล</label>
            <input v-model="userForm.email" type="email" required :readonly="editMode" />
          </div>
          <div class="form-group" v-if="!editMode">
            <label>รหัสผ่าน</label>
            <input v-model="userForm.password" type="password" required />
          </div>
          <div class="form-group">
            <label>บทบาท</label>
            <select v-model="userForm.role">
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit">{{ editMode ? 'บันทึก' : 'เพิ่ม' }}</button>
            <button type="button" @click="closeModal">ยกเลิก</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import AdminMenu from '@/components/AdminMenu.vue';
import { ref, computed, onMounted } from 'vue';
import CyberpunkAlert from '@/components/CyberpunkAlert.vue';
import CyberpunkAlertConfirm from '@/components/CyberpunkAlertConfirm.vue';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser
} from '@/services/userService';

const users = ref([]);
const confirmVisible = ref(false);
const confirmMessage = ref('');
let confirmCallback = null;
const alertMsg = ref('');
const alertType = ref('success');
const alertVisible = ref(false);
function showAlert(message, type = 'success') {
  alertMsg.value = message;
  alertType.value = type;
  alertVisible.value = true;
}
const page = ref(1);
const limit = ref(10);
const total = ref(0);
const hasMore = computed(() => users.value.length === limit.value);
const search = ref('');

const showModal = ref(false);
const editMode = ref(false);
const userForm = ref({ id: null, name: '', email: '', password: '', role: 'USER' });

const fetchUsers = async () => {
  try {
    const params = { page: page.value, limit: limit.value, search: search.value };
    const res = await getUsers(params);
    users.value = res.users || res.data || [];
    total.value = res.total || 0;
  } catch (e) {
    showAlert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้', 'error');
  }
};

const filteredUsers = computed(() => {
  if (!search.value) return users.value;
  return users.value.filter(
    u => (u.name && u.name.includes(search.value)) || (u.email && u.email.includes(search.value))
  );
});

const nextPage = () => {
  page.value++;
  fetchUsers();
};
const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchUsers();
  }
};

const openAddUser = () => {
  editMode.value = false;
  userForm.value = { id: null, name: '', email: '', password: '', role: 'USER' };
  showModal.value = true;
};

const openEditUser = async (user) => {
  editMode.value = true;
  const res = await getUserById(user.id);
  userForm.value = { ...res, password: '' };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const addUser = async () => {
  try {
    await createUser(userForm.value);
    showModal.value = false;
    fetchUsers();
    showAlert('เพิ่มผู้ใช้สำเร็จ', 'success');
  } catch (e) {
    showAlert('เพิ่มผู้ใช้ไม่สำเร็จ', 'error');
  }
};

const updateUser = async () => {
  try {
    await apiUpdateUser(userForm.value.id, userForm.value);
    showModal.value = false;
    fetchUsers();
    showAlert('แก้ไขผู้ใช้สำเร็จ', 'success');
  } catch (e) {
    showAlert('แก้ไขผู้ใช้ไม่สำเร็จ', 'error');
  }
};

function askDeleteUser(id) {
  confirmMessage.value = 'คุณแน่ใจว่าต้องการลบผู้ใช้นี้?';
  confirmVisible.value = true;
  confirmCallback = async () => {
    try {
      await apiDeleteUser(id);
      fetchUsers();
      showAlert('ลบผู้ใช้สำเร็จ', 'success');
    } catch (e) {
      showAlert('ลบผู้ใช้ไม่สำเร็จ', 'error');
    }
  };
}

function onConfirm() {
  if (confirmCallback) confirmCallback();
  confirmVisible.value = false;
}
function onCancel() {
  showAlert('ยกเลิกการลบ', 'info');
  confirmVisible.value = false;
}


const changeRole = async (user) => {
  try {
    await apiUpdateUser(user.id, { role: user.role });
    showAlert('เปลี่ยนสิทธิ์ผู้ใช้สำเร็จ', 'success');
  } catch (e) {
    showAlert('เปลี่ยนสิทธิ์ไม่สำเร็จ', 'error');
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-users-container {
  background: #10101a;
  color: #fff;
  padding: 2rem;
  border-radius: 8px;
  max-width: 1100px;
  margin: 2rem auto;
  box-shadow: 0 0 20px #00ffff33, 0 0 40px #ff00ff22;
}
.admin-users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.add-user-btn {
  background: #ff00ff;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px #ff00ff55;
  transition: background 0.2s;
}
.add-user-btn:hover {
  background: #00ffff;
  color: #222;
}
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.search-bar input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid #00ffff;
  background: #181828;
  color: #fff;
  border-radius: 4px;
}
.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background: #181828;
  border-radius: 4px;
  overflow: hidden;
}
.users-table th, .users-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #222244;
  text-align: left;
}
.users-table th {
  background: #222244;
  color: #00ffff;
}
.edit-btn, .delete-btn {
  padding: 0.3rem 0.7rem;
  margin-right: 0.5rem;
  border: none;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.edit-btn {
  background: #00ffff;
  color: #181828;
}
.edit-btn:hover {
  background: #ff00ff;
  color: #fff;
}
.delete-btn {
  background: #ff0055;
  color: #fff;
}
.delete-btn:hover {
  background: #222244;
}
.pagination {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
}
.pagination button {
  background: #222244;
  color: #00ffff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #181828;
  padding: 2rem 2.5rem;
  border-radius: 8px;
  min-width: 350px;
  box-shadow: 0 0 30px #00ffff33;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  color: #00ffff;
  margin-bottom: 0.3rem;
  display: block;
}
.form-group input, .form-group select {
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1px solid #00ffff;
  background: #222244;
  color: #fff;
  border-radius: 4px;
}
.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}
.form-actions button {
  background: #00ffff;
  color: #222;
  border: none;
  padding: 0.4rem 1.2rem;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.form-actions button[type="button"] {
  background: #ff00ff;
  color: #fff;
}
.form-actions button:hover {
  background: #ff00ff;
  color: #fff;
}
.admin-users-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: none;
}

/* เดิม */
</style>