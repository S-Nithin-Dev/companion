// ============================================
// Host Service
// API calls for host profiles
// ============================================

import api from './api';

const hostService = {
  // Get all hosts
  getAllHosts: async (filters = {}) => {
    try {
      console.log('🔍 Fetching hosts with filters:', filters);
      const params = new URLSearchParams();

      if (filters.activity && filters.activity !== 'all') {
        params.append('activity', filters.activity);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
      if (filters.limit) {
        params.append('limit', filters.limit);
      }
      if (filters.offset) {
        params.append('offset', filters.offset);
      }

      const response = await api.get(`/hosts?${params.toString()}`);
      console.log(`✅ Found ${response.data.hosts.length} hosts`);
      return response.data.hosts;
    } catch (error) {
      console.error('❌ Get hosts failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Get host details
  getHostDetails: async (hostId) => {
    try {
      console.log('🔍 Fetching host details:', hostId);
      const response = await api.get(`/hosts/${hostId}`);
      console.log('✅ Host details retrieved');
      return response.data.host;
    } catch (error) {
      console.error('❌ Get host details failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Create host profile
  createHost: async (hostData) => {
    try {
      console.log('📝 Creating host profile');
      const response = await api.post('/hosts', hostData);
      console.log('✅ Host profile created');
      return response.data.host;
    } catch (error) {
      console.error('❌ Create host failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Update host profile
  updateHost: async (hostId, hostData) => {
    try {
      console.log('📝 Updating host profile:', hostId);
      const response = await api.put(`/hosts/${hostId}`, hostData);
      console.log('✅ Host profile updated');
      return response.data.host;
    } catch (error) {
      console.error('❌ Update host failed:', error.response?.data || error.message);
      throw error;
    }
  },

  // Toggle host mode
  toggleHostMode: async () => {
    try {
      console.log('🔄 Toggling host mode');
      const response = await api.put('/hosts/me/toggle');
      console.log('✅ Host mode toggled');
      return response.data;
    } catch (error) {
      console.error('❌ Toggle host mode failed:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default hostService;
