/**
 * Authentication service for handling API requests related to authentication
 */

// Base API URL - should be moved to environment variables in production
const API_URL = 'http://localhost:3000/api';

/**
 * Login user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise with login response
 */
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    
    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user || { email }));
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

/**
 * Logout user by removing token from localStorage
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get current user from localStorage
 * @returns {Object|null} - User object or null
 */
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Get auth token from localStorage
 * @returns {string|null} - Auth token or null
 */
export const getToken = () => {
  return localStorage.getItem('token');
};
