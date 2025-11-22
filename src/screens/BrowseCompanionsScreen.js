// ============================================
// BrowseCompanionsScreen.js
// Shows list of available companions to book
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,        // Efficient list component
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { hosts, activityTypes } from '../data/mockData';

export default function BrowseCompanionsScreen({ route, navigation }) {

  // Get activity filter from navigation params (if any)
  const initialActivity = route?.params?.activityFilter || 'all';

  // State for search and filter
  const [searchText, setSearchText] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(initialActivity);

  // ============================================
  // FILTER HOSTS based on search and activity
  // ============================================

  const filteredHosts = hosts.filter(host => {
    // Check if name matches search
    const matchesSearch = host.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    // .toLowerCase() makes search case-insensitive
    // .includes() checks if string contains the search text

    // Check if host offers selected activity
    const matchesActivity =
      selectedActivity === 'all' ||
      host.activities.includes(selectedActivity);

    // Return true if BOTH conditions are met
    return matchesSearch && matchesActivity;
  });

  // ============================================
  // RENDER A SINGLE HOST CARD
  // ============================================

  // This function tells FlatList how to render each item
  const renderHostCard = ({ item }) => {
    // "item" is one host object from the array

    return (
      <TouchableOpacity
        style={styles.hostCard}
        onPress={() => {
          // Navigate to HostProfile and pass the host data
          navigation.navigate('HostProfile', { host: item });
        }}
        activeOpacity={0.9}
      >
        {/* Host Photo */}
        <Image
          source={{ uri: item.photo }}
          style={styles.hostPhoto}
        />
        {/*
          source={{ uri: 'url' }} loads image from URL
          For local images: source={require('./image.png')}
        */}

        {/* Price Badge - positioned absolute in top right */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>₹{item.pricePerHour}/hr</Text>
        </View>

        {/* Host Info */}
        <View style={styles.hostInfo}>
          {/* Name and Age */}
          <Text style={styles.hostName}>
            {item.name}, {item.age}
          </Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.ratingStar}>⭐</Text>
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>

          {/* Activities */}
          <View style={styles.activitiesRow}>
            {item.activities.slice(0, 3).map(activityId => {
              // Find the activity object to get its icon
              const activity = activityTypes.find(a => a.id === activityId);
              return (
                <View key={activityId} style={styles.activityTag}>
                  <Text style={styles.activityTagText}>
                    {activity?.icon} {activity?.name}
                  </Text>
                </View>
              );
              // activity?.icon = "optional chaining"
              // If activity is undefined, returns undefined instead of error
            })}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // ============================================
  // MAIN RENDER
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
          <Text style={styles.title}>Find Companions</Text>
        </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name..."
            placeholderTextColor={colors.text.light}
            value={searchText}
            onChangeText={setSearchText}
          />
          {/* Clear button - only show if there's text */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Text style={styles.clearButton}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Activity Filter */}
      <View style={styles.filterContainer}>
        <FlatList
          data={activityTypes}
          horizontal={true}              // Scroll horizontally
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedActivity === item.id && styles.filterChipActive
              ]}
              onPress={() => setSelectedActivity(item.id)}
            >
              <Text style={[
                styles.filterChipText,
                selectedActivity === item.id && styles.filterChipTextActive
              ]}>
                {item.icon} {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* ============================================ */}
      {/* HOST LIST - Using FlatList */}
      {/* ============================================ */}

      <FlatList
        data={filteredHosts}
        renderItem={renderHostCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Empty state when no results
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No companions found</Text>
            <Text style={styles.emptySubtext}>Try a different search or filter</Text>
          </View>
        }
      />
      {/*
        FlatList is better than ScrollView + map for long lists because:
        - It only renders items that are visible on screen
        - Better performance with many items
        - Built-in features like pull-to-refresh, infinite scroll

        Key props:
        - data: the array to render
        - renderItem: function that returns element for each item
        - keyExtractor: function that returns unique key for each item
        - ListEmptyComponent: what to show when list is empty
      */}

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

  header: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  title: {
    fontSize: typography.h1,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  // Search Bar
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadows.small,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
  },

  searchInput: {
    flex: 1,
    fontSize: typography.body,
    color: colors.text.primary,
  },

  clearButton: {
    fontSize: 18,
    color: colors.text.light,
    padding: spacing.xs,
  },

  // Filter Chips
  filterContainer: {
    marginBottom: spacing.md,
    paddingLeft: spacing.lg,
  },

  filterChip: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    marginRight: spacing.sm,
    ...shadows.small,
  },

  filterChipActive: {
    backgroundColor: colors.primary,
  },

  filterChipText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  filterChipTextActive: {
    color: colors.text.inverse,
    fontWeight: '600',
  },

  // Host List
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },

  // Host Card
  hostCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
    overflow: 'hidden',  // Clips child content to border radius
    ...shadows.medium,
  },

  hostPhoto: {
    width: '100%',
    height: 200,
  },

  priceBadge: {
    position: 'absolute',     // Position relative to parent
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.pill,
  },

  priceText: {
    fontSize: typography.caption,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  hostInfo: {
    padding: spacing.md,
  },

  hostName: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },

  ratingStar: {
    fontSize: 14,
    marginRight: spacing.xs,
  },

  ratingText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },

  verifiedBadge: {
    backgroundColor: colors.pastel.mintAqua,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },

  verifiedText: {
    fontSize: typography.small,
    color: colors.text.primary,
    fontWeight: '600',
  },

  activitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },

  activityTag: {
    backgroundColor: colors.pastel.softLilac,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },

  activityTagText: {
    fontSize: typography.small,
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
  },
});
