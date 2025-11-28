// ============================================
// Authentication Service
// API calls for auth (signup, login)
// ============================================

import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authService = {
  // Signup
  signup: async (email, password, name, phone) => {
    try {
      console.log('📝 Signing up:', email);
      const response = await api.post('/auth/signup', {
        email,
        password,
        name,
        phone,
      });

      // Save token and user data
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('✅ Signup successful');
      return response.data;
    } catch (error) {
      console.error('❌ Signup failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Login
  login: async (email, password) => {
    try {
      console.log('🔐 Logging in:', email);
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      // Save token and user data
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('✅ Login successful');
      return response.data;
    } catch (error) {
      console.error('❌ Login failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      console.log('👋 Logging out');
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Logout failed:', error);
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      console.log('👤 Getting current user');
      const response = await api.get('/auth/me');

      // Update stored user data
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      console.log('✅ User data retrieved');
      return response.data.user;
    } catch (error) {
      console.error('❌ Get user failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Check if user is logged in
  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token;
    } catch (error) {
      console.error('❌ Check login status failed:', error);
      return false;
    }
  },

  // Get stored user data
  getStoredUser: async () => {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('❌ Get stored user failed:', error);
      return null;
    }
  },
};

export default authService;
