// ============================================
// AppNavigator.js
// Sets up navigation between all screens
// ============================================

import React from 'react';

// React Navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all our screens
import HomeScreen from '../screens/HomeScreen';
import BrowseCompanionsScreen from '../screens/BrowseCompanionsScreen';
import HostProfileScreen from '../screens/HostProfileScreen';
import BookingScreen from '../screens/BookingScreen';
import ProfileScreen from '../screens/ProfileScreen';

// New screens
import HostSetupScreen from '../screens/HostSetupScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import EarningsScreen from '../screens/EarningsScreen';
import AvailabilityScreen from '../screens/AvailabilityScreen';
import MyReviewsScreen from '../screens/MyReviewsScreen';
import AllReviewsScreen from '../screens/AllReviewsScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import SafetyScreen from '../screens/SafetyScreen';
import TermsScreen from '../screens/TermsScreen';

// Import theme for header styling
import { colors, typography } from '../theme';

// ============================================
// CREATE STACK NAVIGATOR
// ============================================

// Stack Navigator = screens stack on top of each other
// Like a stack of cards - you push new screens on top
// and pop them off to go back

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    // NavigationContainer wraps everything
    // It manages the navigation state
    <NavigationContainer>

      {/* Stack.Navigator contains all the screens */}
      <Stack.Navigator
        initialRouteName="Home"  // First screen to show
        screenOptions={{
          // Default options for all screens
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: typography.h3,
          },
          headerShadowVisible: false,  // Remove header shadow
          headerBackTitleVisible: false, // Hide back button text (iOS)
        }}
      >

        {/* ============================================ */}
        {/* DEFINE EACH SCREEN */}
        {/* ============================================ */}

        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,  // Hide header on home
          }}
        />
        {/*
          name = unique identifier for navigation
          component = the screen component to render
          options = screen-specific settings
        */}

        {/* Browse Companions Screen */}
        <Stack.Screen
          name="BrowseCompanions"
          component={BrowseCompanionsScreen}
          options={{
            headerShown: false,
            title: 'Find Companions',
          }}
        />

        {/* Host Profile Screen */}
        <Stack.Screen
          name="HostProfile"
          component={HostProfileScreen}
          options={{
            headerShown: false,  // We have custom back button
            title: 'Profile',
          }}
        />

        {/* Booking Screen */}
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            headerShown: false,
            title: 'Book Companion',
          }}
        />

        {/* Profile Screen */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            title: 'Profile',
          }}
        />

        {/* ============================================ */}
        {/* NEW SCREENS */}
        {/* ============================================ */}

        {/* Host Setup Screen */}
        <Stack.Screen
          name="HostSetup"
          component={HostSetupScreen}
          options={{
            headerShown: false,
            title: 'Become a Host',
          }}
        />

        {/* Edit Profile Screen */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
            title: 'Edit Profile',
          }}
        />

        {/* Notifications Screen */}
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            headerShown: false,
            title: 'Notifications',
          }}
        />

        {/* Earnings Screen */}
        <Stack.Screen
          name="Earnings"
          component={EarningsScreen}
          options={{
            headerShown: false,
            title: 'My Earnings',
          }}
        />

        {/* Availability Screen */}
        <Stack.Screen
          name="Availability"
          component={AvailabilityScreen}
          options={{
            headerShown: false,
            title: 'Availability',
          }}
        />

        {/* My Reviews Screen */}
        <Stack.Screen
          name="MyReviews"
          component={MyReviewsScreen}
          options={{
            headerShown: false,
            title: 'My Reviews',
          }}
        />

        {/* All Reviews Screen */}
        <Stack.Screen
          name="AllReviews"
          component={AllReviewsScreen}
          options={{
            headerShown: false,
            title: 'Reviews',
          }}
        />

        {/* My Bookings Screen */}
        <Stack.Screen
          name="MyBookings"
          component={MyBookingsScreen}
          options={{
            headerShown: false,
            title: 'My Bookings',
          }}
        />

        {/* Help Center Screen */}
        <Stack.Screen
          name="HelpCenter"
          component={HelpCenterScreen}
          options={{
            headerShown: false,
            title: 'Help Center',
          }}
        />

        {/* Safety Screen */}
        <Stack.Screen
          name="Safety"
          component={SafetyScreen}
          options={{
            headerShown: false,
            title: 'Safety',
          }}
        />

        {/* Terms Screen */}
        <Stack.Screen
          name="Terms"
          component={TermsScreen}
          options={{
            headerShown: false,
            title: 'Terms & Privacy',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
============================================
HOW NAVIGATION WORKS:
============================================

1. Each screen receives 'navigation' prop automatically

2. To go to another screen:
   navigation.navigate('ScreenName')
   navigation.navigate('ScreenName', { data: 'to pass' })

3. To go back:
   navigation.goBack()

4. To access passed data:
   route.params.data

Example:
  // From BrowseCompanionsScreen
  navigation.navigate('HostProfile', { host: selectedHost })

  // In HostProfileScreen
  const host = route.params.host
*/
