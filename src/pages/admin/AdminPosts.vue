<template>
    <div class="admin-posts-layout">
        <AdminMenu class="mt-8" />
        <div class="admin-posts-container">
  
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
    <h1>จัดการบทความ</h1>
    <button class="add-post-btn" @click="openAddPost">+ เพิ่มบทความใหม่</button>
    <div class="posts-table-wrapper">
      <table class="posts-table">
        <thead>
          <tr>
            <th>ชื่อเรื่อง</th>
            <th>Slug</th>
            <th>รูปภาพ</th>
            <th>แท็ก</th>
            <th>เผยแพร่</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.slug">
            <td>{{ post.title }}</td>
            <td>{{ post.slug }}</td>
            <td><img :src="post.image" alt="Image" width="50" height="50" /></td>
            <td>{{ post.tags?.join(', ') }}</td>
            <td>{{ post.published ? 'เผยแพร่' : 'ไม่เผยแพร่' }}</td>
            <td>
              <button class="edit-btn" @click="openEditPost(post)">แก้ไข</button>
              <button class="delete-btn" @click="askDeletePost(post.slug)">ลบ</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">ก่อนหน้า</button>
        <span>หน้า {{ page }}</span>
        <button @click="nextPage" :disabled="!hasMore">ถัดไป</button>
      </div>
    </div>

    <!-- Modal ฟอร์มเพิ่ม/แก้ไขบทความ -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content w-1/2">
        <h2>{{ editMode ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่' }}</h2>
        <form @submit.prevent="editMode ? updatePostForm() : addPost()">
          <div class="form-group">
            <label>ชื่อเรื่อง</label>
            <input v-model="postForm.title" type="text" required placeholder="เช่น Cyberpunk 2025" />
          </div>
          <div class="form-group">
            <label>Slug</label>
            <input v-model="postForm.slug" type="text" required :readonly="editMode" placeholder="เช่น cyberpunk-2025" />
          </div>
          <div class="form-group">
            <label>รูปภาพ (URL)</label>
            <input type="text" v-model="postForm.image" placeholder="เช่น https://example.com/image.jpg" required />
          </div>
          <div class="form-group">
            <label>เนื้อหา</label>
            <textarea v-model="postForm.content" rows="6" required placeholder="เช่น บทความนี้เกี่ยวกับ Cyberpunk 2025"></textarea>
          </div>
          <div class="form-group">
            <label>แท็ก (คั่นด้วย comma)</label>
            <input v-model="tagsInput" @blur="parseTags" @keyup.enter="parseTags" type="text" placeholder="เช่น tech,vue,cyberpunk" />
          </div>
          <div class="form-group">
  <div class="flex items-center">
    <span>เผยแพร่</span>
    <label class="relative inline-flex items-center cursor-pointer ml-2">
      <input type="checkbox" v-model="postForm.published" class="sr-only peer">
      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-cyan-500 transition-colors duration-300"></div>
      <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
    </label>
  </div>
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
import { ref, onMounted } from 'vue';
import {
  getPostsAdmin,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
} from '@/services/postService';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminMenu from '@/components/AdminMenu.vue';
import CyberpunkAlert from '@/components/CyberpunkAlert.vue';
import CyberpunkAlertConfirm from '@/components/CyberpunkAlertConfirm.vue';

const router = useRouter();
const authStore = useAuthStore();

const posts = ref([]);
const page = ref(1);
const limit = ref(10);
const hasMore = ref(false);
const showModal = ref(false);   
const showConfirm = ref(false);
const confirmMessage = ref('');
const confirmType = ref('warning');
const confirmVisible = ref(false);
const editMode = ref(false);
const postForm = ref({ title: '', slug: '', content: '',published: false, tags: [] ,image: '' });
const tagsInput = ref('');
const alertMsg = ref('');
const alertType = ref('success');
const alertVisible = ref(false);
let confirmCallback = null;

function showAlert(message, type = 'success') {
  alertMsg.value = message;
  alertType.value = type;
  alertVisible.value = true;
  setTimeout(() => {
    alertVisible.value = false;
  }, 2500);
}

const fetchPosts = async () => {
  const params = { page: page.value, limit: limit.value };
  const res = await getPostsAdmin(params);
  posts.value = res.data?.posts || res.data || [];
  hasMore.value = (res.data?.posts?.length || res.data?.length || 0) === limit.value;
};

const nextPage = () => { page.value++; fetchPosts(); };
const prevPage = () => { if (page.value > 1) { page.value--; fetchPosts(); } };

const openAddPost = () => {
  editMode.value = false;
  postForm.value = { title: '', slug: '', content: '',published: false, tags: [], image: '' };
  tagsInput.value = '';
  showModal.value = true;
};
const openEditPost = async (post) => {
  editMode.value = true;
  const res = await getPostBySlug(post.slug);
  postForm.value = { ...res.data, tags: res.data.tags || [] ,published: res.data.published ,image: res.data.image };
  tagsInput.value = postForm.value.tags.join(', ');
  showModal.value = true;
};
const closeModal = () => { showModal.value = false; };
const parseTags = () => {
  postForm.value.tags = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean);
};
const addPost = async () => {
  parseTags();
  try {
    await createPost({ ...postForm.value });
    showModal.value = false;
    showAlert('เพิ่มบทความสำเร็จ', 'success');
    fetchPosts();
  } catch (e) {
    showAlert('เพิ่มบทความไม่สำเร็จ', 'error');
  }
};
const updatePostForm = async () => {
try {
  parseTags();
  await updatePost(postForm.value.slug, { ...postForm.value });
  showModal.value = false;
  fetchPosts();
  showAlert('แก้ไขบทความสำเร็จ', 'success');
    } catch (e) {
  showAlert('แก้ไขบทความไม่สำเร็จ', 'error');
    }
};
const askDeletePost = async (slug) => {
 confirmMessage.value = 'คุณแน่ใจว่าต้องการลบบทความนี้?';
  confirmVisible.value = true;
  confirmCallback = async () => {
    try {
      await deletePost(slug);
      fetchPosts();
      showAlert('ลบบทความสำเร็จ', 'success');
    } catch (e) {
      showAlert('ลบบทความไม่สำเร็จ', 'error');
    }
  };
};

const onCancel = () => {
  confirmVisible.value = false;
};

const onConfirm = () => {
  if (confirmCallback) confirmCallback();
  confirmVisible.value = false;
};

onMounted(fetchPosts);
</script>

<style scoped>
.admin-posts-layout {
    display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: none;
  flex-wrap: wrap;
  align-content: stretch;
  justify-content: space-between;
}
.admin-posts-container {
  background: #10101a;
  color: #fff;
  padding: 2rem;
  width: 80%;
  border-radius: 8px;
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: 0 0 20px #00ffff33, 0 0 40px #ff00ff22;
}
.add-post-btn {
  background: #ff00ff;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 0 10px #ff00ff55;
  transition: background 0.2s;
  margin-bottom: 1.5rem;
}
.add-post-btn:hover {
  background: #00ffff;
  color: #222;
}
.posts-table-wrapper {
  overflow-x: auto;
}
.posts-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background: #181828;
  border-radius: 4px;
  overflow: hidden;
}
.posts-table th, .posts-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #222244;
  text-align: left;
}
.posts-table th {
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
.form-group input, .form-group textarea {
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
@media (max-width: 900px) {
  .admin-posts-container {
    width: 100%;
    padding: 1rem;
    min-width: unset;
    max-width: unset;
  }
}
@media (max-width: 700px) {
  .posts-table,
  .posts-table thead,
  .posts-table tbody,
  .posts-table th,
  .posts-table td,
  .posts-table tr {
    display: block;
    width: 100%;
  }
  .posts-table thead {
    display: none;
  }
  .posts-table tr {
    margin-bottom: 1.5rem;
    background: #181828;
    border-radius: 6px;
    box-shadow: 0 0 10px #00ffff22;
    padding: 1rem 0.5rem;
  }
  .posts-table td {
    padding: 0.7rem 0.7rem 0.3rem 0.7rem;
    border: none;
    position: relative;
    text-align: left;
  }
  .posts-table td:before {
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
@media (max-width: 600px) {
  .admin-posts-container {
    padding: 0.5rem;
  }
  .modal-content {
    min-width: 90vw;
    padding: 1rem 0.5rem;
  }
  .form-actions {
    flex-direction: column;
    gap: 0.5rem;
  }
  .form-actions button {
    width: 100%;
  }
  .add-post-btn {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
