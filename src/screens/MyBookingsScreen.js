// ============================================
// MyBookingsScreen.js
// View user's booking history
// ============================================

import React, { useState } from 'react';
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

export default function MyBookingsScreen({ navigation }) {

  // ============================================
  // STATE & DATA
  // ============================================

  const [selectedTab, setSelectedTab] = useState('upcoming');

  const bookings = {
    upcoming: [
      {
        id: '1',
        host: {
          name: 'Priya Sharma',
          photo: 'https://i.pravatar.cc/100?img=1',
        },
        activity: 'Coffee Chat',
        date: 'Dec 20, 2024',
        time: '3:00 PM',
        location: 'Starbucks, MG Road',
        duration: 2,
        totalPrice: 400,
        status: 'confirmed',
      },
      {
        id: '2',
        host: {
          name: 'Arun Kumar',
          photo: 'https://i.pravatar.cc/100?img=3',
        },
        activity: 'City Walk',
        date: 'Dec 22, 2024',
        time: '10:00 AM',
        location: 'Cubbon Park Gate',
        duration: 3,
        totalPrice: 750,
        status: 'pending',
      },
    ],
    past: [
      {
        id: '3',
        host: {
          name: 'Meera Patel',
          photo: 'https://i.pravatar.cc/100?img=5',
        },
        activity: 'Lunch',
        date: 'Dec 10, 2024',
        time: '1:00 PM',
        location: 'Truffles, Indiranagar',
        duration: 2,
        totalPrice: 500,
        status: 'completed',
      },
      {
        id: '4',
        host: {
          name: 'Priya Sharma',
          photo: 'https://i.pravatar.cc/100?img=1',
        },
        activity: 'Coffee Chat',
        date: 'Dec 5, 2024',
        time: '4:00 PM',
        location: 'Third Wave Coffee',
        duration: 1,
        totalPrice: 200,
        status: 'completed',
      },
    ],
  };

  // ============================================
  // RENDER BOOKING CARD
  // ============================================

  const renderBooking = ({ item }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => console.log('View booking details:', item.id)}
    >
      <View style={styles.bookingHeader}>
        <Image
          source={{ uri: item.host.photo }}
          style={styles.hostPhoto}
        />
        <View style={styles.bookingInfo}>
          <Text style={styles.hostName}>{item.host.name}</Text>
          <Text style={styles.activityName}>{item.activity}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          item.status === 'confirmed' && styles.statusConfirmed,
          item.status === 'pending' && styles.statusPending,
          item.status === 'completed' && styles.statusCompleted,
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📅</Text>
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>📍</Text>
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailIcon}>⏱️</Text>
          <Text style={styles.detailText}>{item.duration} hour{item.duration > 1 ? 's' : ''}</Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.priceLabel}>Total</Text>
        <Text style={styles.priceValue}>₹{item.totalPrice}</Text>
      </View>
    </TouchableOpacity>
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
          <Text style={styles.headerTitle}>My Bookings</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'upcoming' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('upcoming')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'upcoming' && styles.tabTextActive,
            ]}>
              Upcoming ({bookings.upcoming.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'past' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('past')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'past' && styles.tabTextActive,
            ]}>
              Past ({bookings.past.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bookings List */}
        <FlatList
          data={bookings[selectedTab]}
          renderItem={renderBooking}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📅</Text>
              <Text style={styles.emptyText}>No {selectedTab} bookings</Text>
              <Text style={styles.emptySubtext}>
                {selectedTab === 'upcoming'
                  ? 'Book a companion to get started!'
                  : 'Your past bookings will appear here'}
              </Text>
            </View>
          }
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

  // List
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  bookingCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadows.small,
  },

  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  hostPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.sm,
  },

  bookingInfo: {
    flex: 1,
  },

  hostName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  activityName: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  statusConfirmed: {
    backgroundColor: colors.pastel.mintAqua,
  },

  statusPending: {
    backgroundColor: colors.pastel.lemonYellow,
  },

  statusCompleted: {
    backgroundColor: colors.pastel.softLilac,
  },

  statusText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.text.primary,
    textTransform: 'capitalize',
  },

  bookingDetails: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  detailIcon: {
    fontSize: 14,
    marginRight: spacing.sm,
  },

  detailText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
  },

  priceLabel: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  priceValue: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },

  emptyEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },

  emptyText: {
    fontSize: typography.h3,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  emptySubtext: {
    fontSize: typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
