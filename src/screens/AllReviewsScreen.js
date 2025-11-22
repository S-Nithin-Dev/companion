// ============================================
// AllReviewsScreen.js
// Show all reviews for a specific host
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function AllReviewsScreen({ route, navigation }) {

  // Get host data from navigation
  const host = route?.params?.host || {
    name: 'Priya Sharma',
    rating: 4.9,
    reviewCount: 47,
  };

  // ============================================
  // MOCK REVIEWS DATA
  // ============================================

  const reviews = [
    {
      id: '1',
      reviewer: { name: 'Amit K.', photo: 'https://i.pravatar.cc/100?img=15' },
      rating: 5,
      date: 'Dec 15, 2024',
      comment: 'Had a great time! Priya is very friendly and knows all the best coffee spots. Highly recommend!',
    },
    {
      id: '2',
      reviewer: { name: 'Sneha R.', photo: 'https://i.pravatar.cc/100?img=32' },
      rating: 5,
      date: 'Dec 10, 2024',
      comment: 'Perfect companion for exploring the city. Very knowledgeable about local history.',
    },
    {
      id: '3',
      reviewer: { name: 'Rahul M.', photo: 'https://i.pravatar.cc/100?img=12' },
      rating: 4,
      date: 'Dec 5, 2024',
      comment: 'Good conversation over lunch. Would have been 5 stars but was slightly late.',
    },
    {
      id: '4',
      reviewer: { name: 'Kavita P.', photo: 'https://i.pravatar.cc/100?img=23' },
      rating: 5,
      date: 'Nov 28, 2024',
      comment: 'Such a lovely person! Made me feel comfortable immediately. Great listener.',
    },
    {
      id: '5',
      reviewer: { name: 'Vikram S.', photo: 'https://i.pravatar.cc/100?img=8' },
      rating: 5,
      date: 'Nov 20, 2024',
      comment: 'Excellent photography tips and great company. Learned a lot!',
    },
    {
      id: '6',
      reviewer: { name: 'Anita J.', photo: 'https://i.pravatar.cc/100?img=28' },
      rating: 5,
      date: 'Nov 15, 2024',
      comment: 'Best city walk ever! Showed me hidden gems I never knew existed.',
    },
  ];

  // ============================================
  // RENDER REVIEW ITEM
  // ============================================

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: item.reviewer.photo }}
          style={styles.reviewerPhoto}
        />
        <View style={styles.reviewerInfo}>
          <Text style={styles.reviewerName}>{item.reviewer.name}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
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
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Reviews</Text>
            <Text style={styles.headerSubtitle}>
              ⭐ {host.rating} • {host.reviewCount} reviews
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Reviews List */}
        <FlatList
          data={reviews}
          renderItem={renderReview}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />

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

  headerCenter: {
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  headerSubtitle: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  // List
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
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
    width: 44,
    height: 44,
    borderRadius: 22,
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

  reviewDate: {
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
