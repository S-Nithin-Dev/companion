// ============================================
// HostProfileScreen.js
// Detailed view of a single companion
// ============================================

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { activityTypes } from '../data/mockData';
import hostService from '../services/hostService';

export default function HostProfileScreen({ route, navigation }) {
  // Get host ID from navigation params
  const hostId = route?.params?.host?.id;

  // State
  const [host, setHost] = useState(route?.params?.host || null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(!host); // Only load if no host data passed

  // ============================================
  // FETCH HOST DATA AND REVIEWS
  // ============================================

  useEffect(() => {
    if (hostId) {
      fetchHostData();
      fetchReviews();
    }
  }, [hostId]);

  const fetchHostData = async () => {
    try {
      console.log('📥 Fetching host details:', hostId);
      const data = await hostService.getHostById(hostId);
      console.log('✅ Fetched host data:', data.name);
      setHost(data);
    } catch (error) {
      console.error('❌ Failed to fetch host:', error);
      Alert.alert('Error', 'Failed to load host profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      console.log('📥 Fetching reviews for host:', hostId);
      const data = await hostService.getHostReviews(hostId);
      console.log('✅ Fetched reviews:', data.length);
      setReviews(data);
    } catch (error) {
      console.error('❌ Failed to fetch reviews:', error);
      // Don't show alert for reviews - not critical
    }
  };

  // ============================================
  // LOADING STATE
  // ============================================

  if (loading || !host) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Get photo - handle both base64 and URL
  const heroPhoto = host.photo_base64
    ? `data:image/jpeg;base64,${host.photo_base64}`
    : host.photo || 'https://via.placeholder.com/400x400?text=No+Photo';

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
            <Text style={styles.heroPriceText}>₹{host.price_per_hour || host.pricePerHour}</Text>
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
              <Text style={styles.statValue}>⭐ {host.rating ? host.rating.toFixed(1) : 'New'}</Text>
              <Text style={styles.statLabel}>{host.review_count || host.reviewCount || 0} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>⚡ {host.response_time || host.responseTime || '< 1 hour'}</Text>
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
          {reviews.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <View style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/50?img=' + (reviews[0].id % 70) }}
                    style={styles.reviewerPhoto}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reviewerName}>{reviews[0].reviewer_name}</Text>
                    <Text style={styles.reviewDate}>{new Date(reviews[0].created_at).toLocaleDateString()}</Text>
                  </View>
                  <Text style={styles.reviewRating}>⭐ {reviews[0].rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.reviewText}>
                  {reviews[0].comment}
                </Text>
              </View>

              {reviews.length > 1 && (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() => navigation.navigate('AllReviews', { host, reviews })}
                >
                  <Text style={styles.seeAllText}>See all {reviews.length} reviews →</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* Spacing for bottom button */}
          <View style={{ height: 100 }} />
        </View>

      </ScrollView>

      {/* ============================================ */}
      {/* FLOATING BOOK BUTTON */}
      {/* ============================================ */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceAmount}>₹{host.price_per_hour || host.pricePerHour}</Text>
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

  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.text.secondary,
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
