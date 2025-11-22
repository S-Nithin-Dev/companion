// ============================================
// SafetyScreen.js
// Safety tips and guidelines
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function SafetyScreen({ navigation }) {

  // ============================================
  // SAFETY TIPS DATA
  // ============================================

  const safetyTips = [
    {
      icon: '📍',
      title: 'Meet in Public Places',
      description: 'Always meet in well-lit, public locations like cafes, parks, or malls. Avoid private residences for first meetings.',
    },
    {
      icon: '👤',
      title: 'Share Your Plans',
      description: 'Tell a friend or family member where you\'re going, who you\'re meeting, and when you expect to return.',
    },
    {
      icon: '📱',
      title: 'Keep Your Phone Charged',
      description: 'Make sure your phone is fully charged before meeting. Keep emergency contacts easily accessible.',
    },
    {
      icon: '✅',
      title: 'Verify Profiles',
      description: 'Look for verified badges on profiles. Check reviews and ratings from other users before booking.',
    },
    {
      icon: '💵',
      title: 'Cash Payments Only',
      description: 'Pay in cash after the meeting. Never send money in advance or share bank details.',
    },
    {
      icon: '🚫',
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, leave immediately. Your safety is more important than being polite.',
    },
    {
      icon: '⚠️',
      title: 'Report Suspicious Behavior',
      description: 'Report any harassment, inappropriate behavior, or safety concerns immediately through the app.',
    },
    {
      icon: '🔒',
      title: 'Protect Personal Information',
      description: 'Don\'t share your home address, workplace, or financial information with someone you just met.',
    },
  ];

  const emergencyContacts = [
    { name: 'Police', number: '100' },
    { name: 'Women Helpline', number: '181' },
    { name: 'Emergency', number: '112' },
  ];

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
          <Text style={styles.headerTitle}>Safety</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introTitle}>Your Safety Matters</Text>
          <Text style={styles.introText}>
            We're committed to creating a safe community. Follow these guidelines to protect yourself.
          </Text>
        </View>

        {/* Safety Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Safety Guidelines</Text>
          {safetyTips.map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <Text style={styles.tipIcon}>{tip.icon}</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Emergency Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contacts</Text>
          <View style={styles.emergencyCard}>
            {emergencyContacts.map((contact, index) => (
              <View
                key={index}
                style={[
                  styles.emergencyRow,
                  index === emergencyContacts.length - 1 && styles.lastRow,
                ]}
              >
                <Text style={styles.emergencyName}>{contact.name}</Text>
                <Text style={styles.emergencyNumber}>{contact.number}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Report Button */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() => console.log('Report issue')}
          >
            <Text style={styles.reportButtonText}>Report a Safety Issue</Text>
          </TouchableOpacity>
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

  // Intro Card
  introCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.pastel.mintAqua,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  introTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  introText: {
    fontSize: typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },

  // Section
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Tip Card
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },

  tipIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },

  tipContent: {
    flex: 1,
  },

  tipTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  tipDescription: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    lineHeight: 20,
  },

  // Emergency Card
  emergencyCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.small,
  },

  emergencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },

  lastRow: {
    borderBottomWidth: 0,
  },

  emergencyName: {
    fontSize: typography.body,
    color: colors.text.primary,
  },

  emergencyNumber: {
    fontSize: typography.body,
    fontWeight: 'bold',
    color: colors.primary,
  },

  // Report Button
  reportButton: {
    backgroundColor: colors.danger,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
  },

  reportButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.white,
  },
});
