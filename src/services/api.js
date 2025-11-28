// ============================================
// API Configuration
// Base setup for all API calls
// ============================================

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL - Change this to your computer's IP address for mobile testing
// Find your IP: Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux)
const BASE_URL = 'http://192.168.29.88:5000/api';

// For testing on physical device, use your computer's IP:
// const BASE_URL = 'http://192.168.29.88:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('🔑 Token added to request');
      }
    } catch (error) {
      console.error('❌ Error getting token:', error);
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error) => {
    if (error.response) {
      // Server responded with error
      console.error(`❌ ${error.response.status} - ${error.response.config.url}`);
      console.error('Error data:', error.response.data);

      // Handle 401 Unauthorized - token expired
      if (error.response.status === 401) {
        console.log('🚫 Unauthorized - clearing token');
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      }
    } else if (error.request) {
      // Request made but no response
      console.error('❌ No response from server');
      console.error('Network error:', error.message);
    } else {
      // Error in request setup
      console.error('❌ Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
