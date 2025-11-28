// ============================================
// ProfileScreen.js
// User's own profile and settings
// ============================================

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { AuthContext } from '../context/AuthContext';
import hostService from '../services/hostService';

export default function ProfileScreen({ navigation }) {

  // ============================================
  // CONTEXT & STATE
  // ============================================

  const { user, logout } = useContext(AuthContext);

  const [isHostMode, setIsHostMode] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [hasHostProfile, setHasHostProfile] = useState(false);

  // ============================================
  // LOAD HOST STATUS
  // ============================================

  const loadHostStatus = async () => {
    try {
      // Try to get user's host profile to check if they have one
      const hosts = await hostService.getAllHosts({ search: user?.name });
      const myHost = hosts.find(h => h.name === user?.name);

      if (myHost) {
        setHasHostProfile(true);
        setIsHostMode(myHost.is_active || false);
      }
    } catch (error) {
      console.log('No host profile found or error loading:', error.message);
      setHasHostProfile(false);
      setIsHostMode(false);
    }
  };

  // Reload host status when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadHostStatus();
      }
    }, [user])
  );

  // ============================================
  // MENU ITEM COMPONENT
  // ============================================

  // Reusable component for menu items
  const MenuItem = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showArrow && <Text style={styles.menuArrow}>›</Text>}
    </TouchableOpacity>
  );

  // ============================================
  // HANDLERS
  // ============================================

  const handleToggleHostMode = async (newValue) => {
    // If user doesn't have a host profile, prompt them to create one
    if (!hasHostProfile) {
      Alert.alert(
        'Become a Host',
        'You need to create a host profile first. Would you like to do that now?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Create Profile',
            onPress: () => navigation.navigate('HostSetup'),
          },
        ]
      );
      return;
    }

    // Toggle host mode via API
    setIsToggling(true);
    try {
      const response = await hostService.toggleHostMode();
      setIsHostMode(response.is_active);

      Alert.alert(
        'Success',
        response.message || `Host mode ${response.is_active ? 'activated' : 'deactivated'}`
      );
    } catch (error) {
      console.error('Toggle failed:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to toggle host mode. Please try again.'
      );
      // Revert the switch back
      setIsHostMode(!newValue);
    } finally {
      setIsToggling(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <LinearGradient
      colors={['#FDF1F8', '#FFF9F5', '#F3E9FF']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Safe area */}
        <View style={styles.safeArea} />

      {/* ============================================ */}
      {/* PROFILE HEADER */}
      {/* ============================================ */}
      <View style={styles.header}>
        <Image
          source={{ uri: user?.photo || 'https://i.pravatar.cc/150?img=30' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name || 'Guest'}</Text>
        <Text style={styles.memberSince}>
          Member since {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
        </Text>

        {/* Edit Profile Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* ============================================ */}
      {/* STATS */}
      {/* ============================================ */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>⭐ 0.0</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Activities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>0</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
      </View>

      {/* ============================================ */}
      {/* HOST MODE TOGGLE */}
      {/* ============================================ */}
      <View style={styles.section}>
        <View style={styles.hostModeCard}>
          <View style={styles.hostModeInfo}>
            <Text style={styles.hostModeTitle}>Host Mode</Text>
            <Text style={styles.hostModeSubtitle}>
              {isHostMode
                ? 'You are visible to others'
                : hasHostProfile
                ? 'Turn on to receive bookings'
                : 'Create a host profile to get started'}
            </Text>
          </View>
          {isToggling ? (
            <ActivityIndicator color={colors.primary} />
          ) : (
            <Switch
              value={isHostMode}
              onValueChange={handleToggleHostMode}
              disabled={isToggling}
              trackColor={{
                false: colors.gray.medium,
                true: colors.pastel.mintAqua,
              }}
              thumbColor={isHostMode ? colors.primary : colors.white}
            />
          )}
        </View>
      </View>

      {/* ============================================ */}
      {/* MENU SECTIONS */}
      {/* ============================================ */}

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="👤"
            title="Personal Information"
            subtitle={user?.email || 'Not set'}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="📱"
            title="Phone Number"
            subtitle={user?.phone || 'Not set'}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Manage alerts"
            onPress={() => navigation.navigate('Notifications')}
          />
        </View>
      </View>

      {/* My Bookings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bookings</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="📅"
            title="My Bookings"
            subtitle="View your bookings"
            onPress={() => navigation.navigate('MyBookings')}
          />
        </View>
      </View>

      {/* Hosting Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hosting</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="💰"
            title="My Earnings"
            subtitle="₹0 this month"
            onPress={() => navigation.navigate('Earnings')}
          />
          <MenuItem
            icon="📅"
            title="Availability"
            subtitle="Set your schedule"
            onPress={() => navigation.navigate('Availability')}
          />
          <MenuItem
            icon="⭐"
            title="My Reviews"
            subtitle={`${user.reviewsCount} reviews`}
            onPress={() => navigation.navigate('MyReviews')}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuCard}>
          <MenuItem
            icon="❓"
            title="Help Center"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <MenuItem
            icon="🛡️"
            title="Safety"
            onPress={() => navigation.navigate('Safety')}
          />
          <MenuItem
            icon="📜"
            title="Terms & Privacy"
            onPress={() => navigation.navigate('Terms')}
          />
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <Text style={styles.version}>Not Alone v1.0.0</Text>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />

      </ScrollView>
    </LinearGradient>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },

  container: {
    flex: 1,
  },

  safeArea: {
    height: 50,
  },

  // Header
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.pastel.babyPink,
    marginBottom: spacing.md,
  },

  name: {
    fontSize: typography.h1,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  memberSince: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },

  editButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  editButtonText: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.primary,
  },

  // Stats
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statDivider: {
    width: 1,
    backgroundColor: colors.gray.light,
  },

  statValue: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  statLabel: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  // Sections
  section: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },

  // Host Mode Card
  hostModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },

  hostModeInfo: {
    flex: 1,
  },

  hostModeTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  hostModeSubtitle: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  // Menu Card
  menuCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },

  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },

  menuContent: {
    flex: 1,
  },

  menuTitle: {
    fontSize: typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },

  menuSubtitle: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  menuArrow: {
    fontSize: 24,
    color: colors.text.light,
  },

  // Logout
  logoutButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.danger,
  },

  logoutText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.danger,
  },

  // Version
  version: {
    textAlign: 'center',
    fontSize: typography.small,
    color: colors.text.light,
    marginTop: spacing.md,
  },
});
