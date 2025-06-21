import api from './api';

// ผู้ใช้ทั่วไป
export const getPosts = (params) => api.get('/posts', { params });
export const getPostBySlug = (slug) => api.get(`/posts/${slug}`);
export const getPostsByTag = (tag, params) => api.get(`/posts/tag/${tag}`, { params });
export const getTags = () => api.get('/posts/tags');
export const createPost = (data) => api.post('/posts', data);
export const updatePost = (slug, data) => api.put(`/posts/update-post-by-slug/${slug}`, data);
export const deletePost = (slug) => api.delete(`/posts/delete-post-by-slug/${slug}`);

// สำหรับแอดมิน
export const getPostsAdmin = (params) => api.get('/posts/admin/get-all-posts', { params });
export const updatePostAdmin = (slug, data) => api.put(`/posts/admin/update-post/${slug}`, data);
export const deletePostAdmin = (slug) => api.delete(`/posts/admin/delete-post/${slug}`);
