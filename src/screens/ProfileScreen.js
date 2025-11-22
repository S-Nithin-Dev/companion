// ============================================
// ProfileScreen.js
// User's own profile and settings
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,       // Toggle switch component
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function ProfileScreen({ navigation }) {

  // ============================================
  // STATE
  // ============================================

  // Is user available as a host?
  const [isHostMode, setIsHostMode] = useState(false);

  // Mock user data (would come from auth/backend)
  const user = {
    name: 'Nithin',
    photo: 'https://i.pravatar.cc/150?img=30',
    email: 'nithin@example.com',
    phone: '+91 98765 43210',
    memberSince: 'Dec 2024',
    rating: 4.8,
    completedActivities: 12,
    reviewsCount: 8,
  };

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

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            // In real app: clear auth state, navigate to login
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
        <Image source={{ uri: user.photo }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.memberSince}>Member since {user.memberSince}</Text>

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
          <Text style={styles.statValue}>⭐ {user.rating}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.completedActivities}</Text>
          <Text style={styles.statLabel}>Activities</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.reviewsCount}</Text>
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
              {isHostMode ? 'You are visible to others' : 'Turn on to receive bookings'}
            </Text>
          </View>
          <Switch
            value={isHostMode}
            onValueChange={setIsHostMode}
            trackColor={{
              false: colors.gray.medium,
              true: colors.pastel.mintAqua,
            }}
            thumbColor={isHostMode ? colors.primary : colors.white}
          />
          {/*
            Switch component:
            - value = current state (true/false)
            - onValueChange = function when toggled
            - trackColor = background color of track
            - thumbColor = color of the circle
          */}
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
            subtitle={user.email}
            onPress={() => navigation.navigate('EditProfile')}
          />
          <MenuItem
            icon="📱"
            title="Phone Number"
            subtitle={user.phone}
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
