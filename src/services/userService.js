/**
 * User management service for handling API requests related to users
 */
import api from './api';

/**
 * Get all users with pagination
 * @param {Object} params - Pagination parameters (page, limit)
 * @returns {Promise} - Promise with users response
 */
export const getUsers = async (params = { page: 1, limit: 10 }) => {
  try {
    
    const response = await api.get('/users', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Get a specific user by ID
 * @param {number} id - User ID
 * @returns {Promise} - Promise with user response
 */
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise} - Promise with created user response
 */
export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

/**
 * Update an existing user
 * @param {number} id - User ID
 * @param {Object} userData - Updated user data
 * @returns {Promise} - Promise with updated user response
 */
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a user
 * @param {number} id - User ID
 * @returns {Promise} - Promise with delete response
 */
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};
