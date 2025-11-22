// ============================================
// MyReviewsScreen.js
// View reviews received as a host
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function MyReviewsScreen({ navigation }) {

  // ============================================
  // MOCK DATA
  // ============================================

  const reviewStats = {
    average: 4.8,
    total: 12,
    breakdown: {
      5: 8,
      4: 3,
      3: 1,
      2: 0,
      1: 0,
    },
  };

  const reviews = [
    {
      id: '1',
      reviewer: {
        name: 'Amit K.',
        photo: 'https://i.pravatar.cc/100?img=15',
      },
      rating: 5,
      date: '2 days ago',
      activity: 'Coffee Chat',
      comment: 'Had an amazing time! Great conversation and very punctual. Would definitely book again.',
    },
    {
      id: '2',
      reviewer: {
        name: 'Priya M.',
        photo: 'https://i.pravatar.cc/100?img=25',
      },
      rating: 5,
      date: '1 week ago',
      activity: 'City Walk',
      comment: 'Knows all the best spots in the city! Very friendly and easy to talk to.',
    },
    {
      id: '3',
      reviewer: {
        name: 'Rahul S.',
        photo: 'https://i.pravatar.cc/100?img=12',
      },
      rating: 4,
      date: '2 weeks ago',
      activity: 'Lunch',
      comment: 'Good company for lunch. Conversation was nice but was 10 mins late.',
    },
    {
      id: '4',
      reviewer: {
        name: 'Sneha R.',
        photo: 'https://i.pravatar.cc/100?img=32',
      },
      rating: 5,
      date: '3 weeks ago',
      activity: 'Coffee Chat',
      comment: 'Perfect companion for a coffee break. Very attentive and interesting!',
    },
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
          <Text style={styles.headerTitle}>My Reviews</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.averageSection}>
            <Text style={styles.averageNumber}>{reviewStats.average}</Text>
            <Text style={styles.averageStars}>⭐⭐⭐⭐⭐</Text>
            <Text style={styles.totalReviews}>{reviewStats.total} reviews</Text>
          </View>

          <View style={styles.breakdownSection}>
            {[5, 4, 3, 2, 1].map(stars => (
              <View key={stars} style={styles.breakdownRow}>
                <Text style={styles.breakdownStars}>{stars}</Text>
                <View style={styles.breakdownBar}>
                  <View style={[
                    styles.breakdownFill,
                    { width: `${(reviewStats.breakdown[stars] / reviewStats.total) * 100}%` }
                  ]} />
                </View>
                <Text style={styles.breakdownCount}>{reviewStats.breakdown[stars]}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews List */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>All Reviews</Text>

          {reviews.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: review.reviewer.photo }}
                  style={styles.reviewerPhoto}
                />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{review.reviewer.name}</Text>
                  <Text style={styles.reviewMeta}>
                    {review.activity} • {review.date}
                  </Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {review.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
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

  // Stats Card
  statsCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    ...shadows.medium,
  },

  averageSection: {
    alignItems: 'center',
    paddingRight: spacing.lg,
    borderRightWidth: 1,
    borderRightColor: colors.gray.light,
  },

  averageNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  averageStars: {
    fontSize: 12,
    marginBottom: spacing.xs,
  },

  totalReviews: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  breakdownSection: {
    flex: 1,
    paddingLeft: spacing.lg,
    justifyContent: 'center',
  },

  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  breakdownStars: {
    fontSize: typography.small,
    color: colors.text.secondary,
    width: 15,
  },

  breakdownBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.gray.light,
    borderRadius: 3,
    marginHorizontal: spacing.sm,
  },

  breakdownFill: {
    height: '100%',
    backgroundColor: colors.pastel.lemonYellow,
    borderRadius: 3,
  },

  breakdownCount: {
    fontSize: typography.small,
    color: colors.text.light,
    width: 20,
    textAlign: 'right',
  },

  // Reviews Section
  reviewsSection: {
    paddingHorizontal: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },

  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  reviewerPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.sm,
  },

  reviewerInfo: {
    flex: 1,
  },

  reviewerName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  reviewMeta: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  ratingBadge: {
    backgroundColor: colors.pastel.lemonYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  ratingText: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.primary,
  },

  reviewComment: {
    fontSize: typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
});
