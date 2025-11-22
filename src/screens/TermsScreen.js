// ============================================
// TermsScreen.js
// Terms of Service and Privacy Policy
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function TermsScreen({ navigation }) {

  // ============================================
  // STATE
  // ============================================

  const [activeTab, setActiveTab] = useState('terms');

  // ============================================
  // CONTENT
  // ============================================

  const termsContent = [
    {
      title: '1. Acceptance of Terms',
      content: 'By using Not Alone, you agree to these Terms of Service. If you do not agree, please do not use the app.',
    },
    {
      title: '2. User Eligibility',
      content: 'You must be at least 18 years old to use this service. By using the app, you represent that you meet this requirement.',
    },
    {
      title: '3. User Conduct',
      content: 'You agree to treat all users with respect. Harassment, discrimination, or inappropriate behavior will result in immediate account termination.',
    },
    {
      title: '4. Payments',
      content: 'All payments are made directly between users in cash. Not Alone does not process payments or charge service fees.',
    },
    {
      title: '5. Liability',
      content: 'Not Alone is a platform connecting users. We are not responsible for interactions between users. Use the service at your own risk.',
    },
    {
      title: '6. Account Termination',
      content: 'We reserve the right to terminate accounts that violate our terms or community guidelines without prior notice.',
    },
    {
      title: '7. Changes to Terms',
      content: 'We may update these terms periodically. Continued use of the app after changes constitutes acceptance of new terms.',
    },
  ];

  const privacyContent = [
    {
      title: '1. Information We Collect',
      content: 'We collect your name, email, phone number, profile photo, and location data to provide our services.',
    },
    {
      title: '2. How We Use Information',
      content: 'Your information is used to facilitate bookings, verify users, and improve our services. We do not sell your data.',
    },
    {
      title: '3. Information Sharing',
      content: 'We share necessary booking details between users. Your contact info is only shared after a booking is confirmed.',
    },
    {
      title: '4. Data Security',
      content: 'We use industry-standard encryption to protect your data. However, no system is 100% secure.',
    },
    {
      title: '5. Your Rights',
      content: 'You can request to view, edit, or delete your personal data at any time by contacting support.',
    },
    {
      title: '6. Cookies',
      content: 'We use cookies and similar technologies to improve user experience and analyze app usage.',
    },
    {
      title: '7. Contact Us',
      content: 'For privacy-related questions, contact us at privacy@notalone.app.',
    },
  ];

  const content = activeTab === 'terms' ? termsContent : privacyContent;

  // ============================================
  // RENDER
  // ============================================

  return (
    <LinearGradient
      colors={['#FDF1F8', '#FFF9F5', '#F3E9FF']}
      style={styles.gradient}
    >
      <View style={styles.container}>

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
          <Text style={styles.headerTitle}>Legal</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'terms' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('terms')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'terms' && styles.tabTextActive,
            ]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'privacy' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('privacy')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'privacy' && styles.tabTextActive,
            ]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.lastUpdated}>
              Last updated: December 2024
            </Text>

            {content.map((section, index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionContent}>{section.content}</Text>
              </View>
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>

      </View>
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
    marginBottom: spacing.md,
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

  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },

  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.pill,
    backgroundColor: colors.white,
    ...shadows.small,
  },

  tabActive: {
    backgroundColor: colors.primary,
  },

  tabText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  tabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },

  // Content
  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingHorizontal: spacing.lg,
  },

  lastUpdated: {
    fontSize: typography.small,
    color: colors.text.light,
    marginBottom: spacing.lg,
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  sectionContent: {
    fontSize: typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});
