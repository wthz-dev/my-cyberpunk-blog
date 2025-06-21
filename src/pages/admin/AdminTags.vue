<template>
  <div class="admin-tags-layout">
    <AdminMenu class="mt-8" />
    <div class="admin-tags-container">
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
      <div class="admin-tags-header">
        <h1>จัดการแท็กบทความ</h1>
        <form class="add-tag-form" @submit.prevent="onSubmit">
          <input v-model="form.name" placeholder="ชื่อแท็ก" required />
          <button type="submit" class="add-tag-btn">{{ form.id ? 'อัปเดต' : 'เพิ่ม' }}</button>
          <button v-if="form.id" type="button" @click="resetForm" class="cancel-btn">ยกเลิก</button>
        </form>
      </div>
      <div v-if="tags.length > 0">
        <table class="tags-table">
          <thead>
            <tr>
              <th>ชื่อแท็ก</th>
              <th>จำนวนโพสต์</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tag in tags" :key="tag.id">
              <td>{{ tag.name }}</td>
              <td>{{ tag._count?.posts || 0 }}</td>
              <td>
                <button class="edit-btn" @click="editTag(tag)">แก้ไข</button>
                <button class="delete-btn" @click="askDeleteTag(tag.id, tag._count?.posts || 0)" >ลบ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="no-tags">
        ไม่พบแท็ก
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page.value === 1">ก่อนหน้า</button>
        <span>หน้า {{ page.value }}</span>
        <button @click="nextPage" :disabled="!hasMore.value">ถัดไป</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllTags, createTag, updateTag, deleteTag } from '@/services/tagService';
import { useAuthStore } from '@/stores/auth';
import CyberpunkAlert from '@/components/CyberpunkAlert.vue';
import CyberpunkAlertConfirm from '@/components/CyberpunkAlertConfirm.vue';
import AdminMenu from '@/components/AdminMenu.vue';

const tags = ref([]);
const form = ref({ id: null, name: '' });
const page = ref(1);
const limit = ref(10);
const hasMore = ref(false);
const authStore = useAuthStore();
const alertMsg = ref('');
const alertType = ref('success');
const alertVisible = ref(false);
const confirmVisible = ref(false);
const confirmMessage = ref('');
const confirmCallback = ref(null);

function showAlert(message, type = 'success') {
  alertMsg.value = message;
  alertType.value = type;
  alertVisible.value = true;
  setTimeout(() => {
    alertVisible.value = false;
  }, 2500);
}

const fetchTags = async () => {
  const res = await getAllTags({ page: page.value, limit: limit.value });
  console.log(res.tags);
  tags.value = res.tags;
  hasMore.value = (res.tags?.length || res.data?.length || 0) === limit.value;
};

const onSubmit = async () => {
  if (!form.value.name.trim()) return;
  try {
    if (form.value.id) {
      await updateTag(form.value.id, { name: form.value.name });
    } else {
      await createTag({ name: form.value.name });
    }
    resetForm();
    fetchTags();
  } catch (e) {
    showAlert('เกิดข้อผิดพลาด: ' + (e.response?.data?.message || e.message), 'error');
  }
};

const editTag = (tag) => {
  form.value.id = tag.id;
  form.value.name = tag.name;
};

const resetForm = () => {
  form.value.id = null;
  form.value.name = '';
};

const deleteTagById = async (id) => {
  try {
    await deleteTag(id);
    fetchTags();
    showAlert('ลบแท็กสำเร็จ', 'success');
  } catch (e) {
    showAlert('ลบแท็กไม่สำเร็จ: ' + (e.response?.data?.message || e.message), 'error');
  }
};

const askDeleteTag = (id, count) => {
   
    if (count === 0) {
        confirmMessage.value = 'คุณต้องการลบแท็กนี้?';
        confirmVisible.value = true;
        confirmCallback.value = () => deleteTagById(id);
    } else {
        showAlert('ไม่สามารถลบแท็กนี้ได้ เนื่องจากมีโพสต์ที่ใช้แท็กนี้', 'error');
    }
};

const onConfirm = () => {
  if (confirmCallback.value) {
    confirmCallback.value();
    confirmVisible.value = false;
  }
};

const onCancel = () => {
  confirmVisible.value = false;
};

onMounted(fetchTags);

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    fetchTags();
  }
};

const nextPage = () => {
  if (hasMore.value) {
    page.value++;
    fetchTags();
  }
};
</script>

<style scoped>
.admin-tags-layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: none;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-between;
}
.admin-tags-container {
  background: #10101a;
  color: #fff;
  padding: 2rem;
  width: 80%;
  border-radius: 8px;
  max-width: 1200px;
  margin: 2rem 0rem 2rem 0rem;
  box-shadow: 0 0 20px #00ffff33, 0 0 40px #ff00ff22;
}
.admin-tags-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.add-tag-form {
  display: flex;
  gap: 1rem;
}
.add-tag-btn {
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
.add-tag-btn:hover {
  background: #00ffff;
  color: #222;
}
.cancel-btn {
  background: #444;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
.tags-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background: #181828;
  border-radius: 4px;
  overflow: hidden;
}
.tags-table th, .tags-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #222244;
  text-align: left;
}
.tags-table th {
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
.no-tags {
  margin: 2rem 0;
  text-align: center;
  color: #ff00ff;
  font-weight: bold;
}
/* Responsive Design */
@media (max-width: 1200px) {
  .admin-tags-container {
    width: 95%;
    padding: 1.2rem;
    margin: 1rem 0;
  }
}
@media (max-width: 900px) {
  .admin-tags-layout {
    flex-direction: column;
    align-items: stretch;
    gap: 0;
  }
  .admin-tags-container {
    width: 100%;
    margin: 0.5rem 0;
    padding: 1rem;
    min-width: unset;
    max-width: unset;
  }
  .admin-tags-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .pagination {
    justify-content: center;
  }
}
@media (max-width: 700px) {
  .tags-table,
  .tags-table thead,
  .tags-table tbody,
  .tags-table th,
  .tags-table td,
  .tags-table tr {
    display: block;
    width: 100%;
  }
  .tags-table thead {
    display: none;
  }
  .tags-table tr {
    margin-bottom: 1.5rem;
    background: #181828;
    border-radius: 6px;
    box-shadow: 0 0 10px #00ffff22;
    padding: 1rem 0.5rem;
  }
  .tags-table td {
    padding: 0.7rem 0.7rem 0.3rem 0.7rem;
    border: none;
    position: relative;
    text-align: left;
  }
  .tags-table td:before {
    content: attr(data-label);
    display: block;
    font-size: 0.85em;
    color: #00ffff;
    margin-bottom: 0.2em;
    font-weight: bold;
  }
  .edit-btn, .delete-btn {
    margin-bottom: 0.5rem;
    width: 48%;
    min-width: 90px;
  }
}
</style>
