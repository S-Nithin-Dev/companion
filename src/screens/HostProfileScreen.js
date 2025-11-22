// ============================================
// HostProfileScreen.js
// Detailed view of a single companion
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { activityTypes } from '../data/mockData';

export default function HostProfileScreen({ route, navigation }) {
  // Get host data from navigation params
  // If no data passed, use default (for testing)
  const host = route?.params?.host || {
    id: '1',
    name: 'Priya Sharma',
    age: 26,
    photo: 'https://i.pravatar.cc/300?img=1',
    rating: 4.9,
    reviewCount: 47,
    pricePerHour: 200,
    bio: 'Love meeting new people! I\'m a photographer and travel enthusiast. Great for coffee chats, city tours, or just hanging out. I know all the best cafes in town!',
    activities: ['coffee', 'walk', 'lunch'],
    interests: ['Photography', 'Travel', 'Books', 'Music'],
    languages: ['English', 'Hindi'],
    responseTime: '< 1 hour',
    verified: true,
  };

  // Use larger photo for hero
  const heroPhoto = host.photo.replace('150', '300');

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ============================================ */}
        {/* HERO IMAGE */}
        {/* ============================================ */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: heroPhoto }}
            style={styles.heroImage}
          />

          {/* Gradient overlay at bottom of image */}
          <View style={styles.heroOverlay} />

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // Go back to previous screen
              navigation.goBack();
            }}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>

          {/* Price Badge */}
          <View style={styles.heroPriceBadge}>
            <Text style={styles.heroPriceText}>₹{host.pricePerHour}</Text>
            <Text style={styles.heroPriceUnit}>/hour</Text>
          </View>
        </View>

        {/* ============================================ */}
        {/* PROFILE INFO */}
        {/* ============================================ */}
        <View style={styles.content}>

          {/* Name and Verification */}
          <View style={styles.nameRow}>
            <Text style={styles.name}>{host.name}, {host.age}</Text>
            {host.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>

          {/* Rating and Response Time */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>⭐ {host.rating}</Text>
              <Text style={styles.statLabel}>{host.reviewCount} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>⚡ {host.responseTime}</Text>
              <Text style={styles.statLabel}>response</Text>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.bioText}>{host.bio}</Text>
          </View>

          {/* Activities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activities</Text>
            <View style={styles.tagsContainer}>
              {host.activities.map(activityId => {
                const activity = activityTypes.find(a => a.id === activityId);
                return (
                  <View
                    key={activityId}
                    style={[styles.tag, { backgroundColor: colors.pastel.lemonYellow }]}
                  >
                    <Text style={styles.tagText}>
                      {activity?.icon} {activity?.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.tagsContainer}>
              {host.interests.map(interest => (
                <View
                  key={interest}
                  style={[styles.tag, { backgroundColor: colors.pastel.mintAqua }]}
                >
                  <Text style={styles.tagText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.tagsContainer}>
              {host.languages.map(language => (
                <View
                  key={language}
                  style={[styles.tag, { backgroundColor: colors.pastel.softLilac }]}
                >
                  <Text style={styles.tagText}>{language}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Reviews Preview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image
                  source={{ uri: 'https://i.pravatar.cc/50?img=15' }}
                  style={styles.reviewerPhoto}
                />
                <View>
                  <Text style={styles.reviewerName}>Amit K.</Text>
                  <Text style={styles.reviewDate}>2 weeks ago</Text>
                </View>
                <Text style={styles.reviewRating}>⭐ 5.0</Text>
              </View>
              <Text style={styles.reviewText}>
                Had a great time! Priya is very friendly and knows all the best coffee spots. Highly recommend!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.seeAllButton}
              onPress={() => navigation.navigate('AllReviews', { host })}
            >
              <Text style={styles.seeAllText}>See all {host.reviewCount} reviews →</Text>
            </TouchableOpacity>
          </View>

          {/* Spacing for bottom button */}
          <View style={{ height: 100 }} />
        </View>

      </ScrollView>

      {/* ============================================ */}
      {/* FLOATING BOOK BUTTON */}
      {/* ============================================ */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceAmount}>₹{host.pricePerHour}</Text>
          <Text style={styles.bottomPriceUnit}>/hour</Text>
        </View>

        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => {
            // Navigate to Booking with host data
            navigation.navigate('Booking', { host });
          }}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Hero Section
  heroContainer: {
    height: 350,
    position: 'relative',  // For absolute positioned children
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    // In real app, use LinearGradient for smooth fade
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    fontSize: 24,
    color: colors.text.primary,
  },

  heroPriceBadge: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'baseline',
    ...shadows.medium,
  },

  heroPriceText: {
    fontSize: typography.h2,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  heroPriceUnit: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginLeft: 2,
  },

  // Content
  content: {
    padding: spacing.lg,
    marginTop: -spacing.lg,  // Overlap the hero slightly
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  name: {
    fontSize: typography.h1,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginRight: spacing.sm,
  },

  verifiedBadge: {
    backgroundColor: colors.pastel.mintAqua,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  verifiedText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.text.primary,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...shadows.small,
  },

  stat: {
    flex: 1,
    alignItems: 'center',
  },

  statDivider: {
    width: 1,
    backgroundColor: colors.gray.medium,
    marginHorizontal: spacing.md,
  },

  statValue: {
    fontSize: typography.body,
    fontWeight: '600',
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
  },

  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },

  bioText: {
    fontSize: typography.body,
    color: colors.text.secondary,
    lineHeight: 24,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
  },

  tagText: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.primary,
  },

  // Review
  reviewCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
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

  reviewerName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  reviewDate: {
    fontSize: typography.small,
    color: colors.text.secondary,
  },

  reviewRating: {
    marginLeft: 'auto',
    fontSize: typography.caption,
    fontWeight: '600',
  },

  reviewText: {
    fontSize: typography.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },

  seeAllButton: {
    marginTop: spacing.md,
  },

  seeAllText: {
    fontSize: typography.body,
    color: colors.primary,
    fontWeight: '600',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,  // Extra for home indicator
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
    ...shadows.medium,
  },

  bottomPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  bottomPriceAmount: {
    fontSize: typography.h2,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  bottomPriceUnit: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginLeft: 2,
  },

  bookButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    ...shadows.small,
  },

  bookButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
