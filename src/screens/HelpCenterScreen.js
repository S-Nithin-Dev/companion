// ============================================
// HelpCenterScreen.js
// FAQ and support options
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function HelpCenterScreen({ navigation }) {

  // ============================================
  // FAQ DATA
  // ============================================

  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      id: '1',
      question: 'How do I book a companion?',
      answer: 'Browse available companions, select one you like, choose your activity and duration, then send a booking request. The host will confirm within 24 hours.',
    },
    {
      id: '2',
      question: 'How does payment work?',
      answer: 'All payments are made in cash directly to the host after your meeting. We do not charge any service fees.',
    },
    {
      id: '3',
      question: 'Can I cancel a booking?',
      answer: 'Yes, you can cancel up to 2 hours before the scheduled time. Go to My Bookings and tap on the booking you want to cancel.',
    },
    {
      id: '4',
      question: 'How do I become a host?',
      answer: 'Go to your Profile, tap on "Become a Host" and fill out the application. We\'ll review it within 24 hours.',
    },
    {
      id: '5',
      question: 'Is my personal information safe?',
      answer: 'Yes, we take privacy seriously. Your contact details are only shared with hosts after you confirm a booking.',
    },
    {
      id: '6',
      question: 'What if I have a bad experience?',
      answer: 'Contact our support team immediately. We take all reports seriously and will investigate promptly.',
    },
    {
      id: '7',
      question: 'How are hosts verified?',
      answer: 'All hosts undergo ID verification and background checks. Verified badges indicate completed verification.',
    },
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
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

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Contact Options */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactCards}>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => Linking.openURL('mailto:support@notalone.app')}
            >
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactLabel}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => Linking.openURL('tel:+911234567890')}
            >
              <Text style={styles.contactIcon}>📞</Text>
              <Text style={styles.contactLabel}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactCard}
              onPress={() => console.log('Open chat')}
            >
              <Text style={styles.contactIcon}>💬</Text>
              <Text style={styles.contactLabel}>Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {faqs.map(faq => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqItem}
              onPress={() => toggleExpand(faq.id)}
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqArrow}>
                  {expandedId === faq.id ? '−' : '+'}
                </Text>
              </View>
              {expandedId === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
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

  // Section
  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Contact Section
  contactSection: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },

  contactCards: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  contactCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },

  contactIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  contactLabel: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  // FAQ Section
  faqSection: {
    paddingHorizontal: spacing.lg,
  },

  faqItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },

  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  faqQuestion: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    paddingRight: spacing.sm,
  },

  faqArrow: {
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },

  faqAnswer: {
    fontSize: typography.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
    lineHeight: 22,
  },
});
