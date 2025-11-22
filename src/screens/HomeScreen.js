// ============================================
// HomeScreen.js - Main landing page
// First screen users see when opening the app
// ============================================

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import our theme
import { colors, spacing, borderRadius, shadows, typography } from '../theme';

// Import activity types from our data
import { activityTypes } from '../data/mockData';

// The component receives "navigation" as a prop
// This lets us move to other screens (we'll set this up later)
export default function HomeScreen({ navigation }) {

  // Animation for entrance effect
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    // Gradient background for the whole screen
    <LinearGradient
      colors={['#FDF1F8', '#FFF9F5', '#F3E9FF']}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Safe area padding at top */}
        <View style={styles.safeArea} />

      {/* ============================================ */}
      {/* HEADER SECTION */}
      {/* ============================================ */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello there 👋</Text>
          <Text style={styles.title}>Not Alone</Text>
        </View>

        {/* Profile picture - tap to go to profile */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=30' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* ============================================ */}
      {/* MAIN FEATURE CARDS */}
      {/* ============================================ */}
      <View style={styles.cardsContainer}>

        {/* Card 1: Find a Companion */}
        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: colors.pastel.lemonYellow }]}
          onPress={() => {
            // Navigate to BrowseCompanions screen
            navigation.navigate('BrowseCompanions');
          }}
        >
          <Text style={styles.cardEmoji}>🔍</Text>
          <Text style={styles.cardTitle}>Find a Companion</Text>
          <Text style={styles.cardDescription}>
            Browse and book companions for any activity
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Become a Host */}
        <TouchableOpacity
          style={[styles.featureCard, { backgroundColor: colors.pastel.mintAqua }]}
          onPress={() => {
            navigation.navigate('HostSetup');
          }}
        >
          <Text style={styles.cardEmoji}>💰</Text>
          <Text style={styles.cardTitle}>Become a Host</Text>
          <Text style={styles.cardDescription}>
            Earn money by offering your time
          </Text>
          <View style={styles.cardArrow}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ============================================ */}
      {/* QUICK ACTIVITIES SECTION */}
      {/* ============================================ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Activities</Text>

        {/*
          .map() loops through an array and returns new elements
          It's how we render lists in React
        */}
        <View style={styles.activitiesGrid}>
          {activityTypes
            .filter(activity => activity.id !== 'all')  // Remove 'all' option
            .map((activity) => (
              // Each item in a list needs a unique "key" prop
              <TouchableOpacity
                key={activity.id}
                style={styles.activityItem}
                onPress={() => {
                  // Navigate to BrowseCompanions with activity filter
                  navigation.navigate('BrowseCompanions', { activityFilter: activity.id });
                }}
              >
                <View style={styles.activityIcon}>
                  <Text style={styles.activityEmoji}>{activity.icon}</Text>
                </View>
                <Text style={styles.activityName}>{activity.name}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
      </View>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>

        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={[styles.stepNumber, { backgroundColor: colors.pastel.babyPink }]}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>Browse companions</Text>
          </View>

          <View style={styles.step}>
            <View style={[styles.stepNumber, { backgroundColor: colors.pastel.lemonYellow }]}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>Send a request</Text>
          </View>

          <View style={styles.step}>
            <View style={[styles.stepNumber, { backgroundColor: colors.pastel.mintAqua }]}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>Meet & pay in cash</Text>
          </View>
        </View>
      </View>

      {/* Bottom padding */}
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
    height: 50,  // Space for status bar
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  greeting: {
    fontSize: typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },

  title: {
    fontSize: typography.h1,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.pastel.babyPink,
  },

  // Feature Cards
  cardsContainer: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,  // Space between cards
    marginBottom: spacing.xl,
  },

  featureCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    ...shadows.medium,
  },

  cardEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },

  cardTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  cardDescription: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },

  cardArrow: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrowText: {
    fontSize: 20,
    color: colors.text.primary,
  },

  // Section
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },

  sectionTitle: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  // Activities Grid
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Wrap to next line when full
    gap: spacing.sm,
  },

  activityItem: {
    alignItems: 'center',
    width: '22%',  // 4 items per row (with gaps)
  },

  activityIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
    ...shadows.small,
  },

  activityEmoji: {
    fontSize: 24,
  },

  activityName: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Steps
  stepsContainer: {
    gap: spacing.md,
  },

  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  stepNumberText: {
    fontSize: typography.body,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  stepText: {
    fontSize: typography.body,
    color: colors.text.secondary,
  },
});
