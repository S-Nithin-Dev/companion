// ============================================
// NotificationsScreen.js
// Manage notification preferences
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function NotificationsScreen({ navigation }) {

  // ============================================
  // NOTIFICATION SETTINGS STATE
  // ============================================

  const [settings, setSettings] = useState({
    // Booking notifications
    newBookings: true,
    bookingReminders: true,
    bookingUpdates: true,

    // Message notifications
    newMessages: true,

    // Marketing
    promotions: false,
    newsletter: false,

    // General
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
  });

  // Toggle a setting
  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  // ============================================
  // SETTING ROW COMPONENT
  // ============================================

  const SettingRow = ({ title, subtitle, settingKey }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={settings[settingKey]}
        onValueChange={() => toggleSetting(settingKey)}
        trackColor={{
          false: colors.gray.medium,
          true: colors.pastel.mintAqua,
        }}
        thumbColor={settings[settingKey] ? colors.primary : colors.white}
      />
    </View>
  );

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

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Booking Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bookings</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              title="New Booking Requests"
              subtitle="When someone wants to book you"
              settingKey="newBookings"
            />
            <SettingRow
              title="Booking Reminders"
              subtitle="Reminders before scheduled meetings"
              settingKey="bookingReminders"
            />
            <SettingRow
              title="Booking Updates"
              subtitle="Changes to your bookings"
              settingKey="bookingUpdates"
            />
          </View>
        </View>

        {/* Messages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              title="New Messages"
              subtitle="When you receive a message"
              settingKey="newMessages"
            />
          </View>
        </View>

        {/* Marketing */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              title="Promotions"
              subtitle="Special offers and discounts"
              settingKey="promotions"
            />
            <SettingRow
              title="Newsletter"
              subtitle="Tips and updates"
              settingKey="newsletter"
            />
          </View>
        </View>

        {/* Channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Channels</Text>
          <View style={styles.settingsCard}>
            <SettingRow
              title="Push Notifications"
              subtitle="Notifications on your device"
              settingKey="pushEnabled"
            />
            <SettingRow
              title="Email"
              subtitle="Receive emails"
              settingKey="emailEnabled"
            />
            <SettingRow
              title="SMS"
              subtitle="Text messages"
              settingKey="smsEnabled"
            />
          </View>
        </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },

  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },

  headerTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },

  settingsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: typography.body,
    color: colors.text.primary,
    marginBottom: 2,
  },

  settingSubtitle: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },
});
