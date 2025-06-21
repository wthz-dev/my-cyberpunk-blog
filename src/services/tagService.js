import api from './api';

// ดึงแท็กทั้งหมด (public)
export const getAllTags = async (params) => {
  const res = await api.get('/tags', { params });
  return res.data;
};

// ดึงแท็กตาม ID (public)
export const getTagById = async (id) => {
  const res = await api.get(`/tags/${id}`);
  return res.data;
};

// ดึงโพสต์ตาม tag ID (public)
export const getPostsByTagId = async (id) => {
  const res = await api.get(`/tags/${id}/posts`);
  return res.data;
};

// สร้างแท็กใหม่ (admin)
export const createTag = async (tag) => {
  const res = await api.post('/tags', tag);
  return res.data;
};

// อัปเดตแท็ก (admin)
export const updateTag = async (id, tag) => {
  const res = await api.put(`/tags/${id}`, tag);
  return res.data;
};

// ลบแท็ก (admin, ตรวจสอบว่าไม่ได้ถูกใช้ในโพสต์)
export const deleteTag = async (id) => {
  const res = await api.delete(`/tags/${id}`);
  return res.data;
};
