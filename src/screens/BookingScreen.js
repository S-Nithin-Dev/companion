// ============================================
// BookingScreen.js
// Form to request/book a companion
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { activityTypes } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

// Import service - we'll create bookingService
import api from '../services/api';

export default function BookingScreen({ route, navigation }) {
  const { user } = useAuth();

  // Get host data from navigation
  const host = route?.params?.host || {
    id: '1',
    name: 'Priya Sharma',
    photo: 'https://i.pravatar.cc/150?img=1',
    pricePerHour: 200,
    price_per_hour: 200,
    activities: ['coffee', 'walk', 'lunch'],
  };

  // ============================================
  // FORM STATE
  // ============================================

  const [selectedActivity, setSelectedActivity] = useState(host.activities[0]);
  const [duration, setDuration] = useState(2);  // Default 2 hours
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // ============================================
  // CALCULATED VALUES
  // ============================================

  // Total price = hourly rate × duration
  const pricePerHour = host.price_per_hour || host.pricePerHour;
  const totalPrice = pricePerHour * duration;

  // Check if form is valid (location is required)
  const isFormValid = location.trim().length > 0 && !loading;

  // ============================================
  // HANDLE BOOKING SUBMISSION
  // ============================================

  const handleSubmit = async () => {
    if (!isFormValid) {
      Alert.alert('Missing Information', 'Please enter a meeting location');
      return;
    }

    setLoading(true);

    try {
      console.log('📝 Creating booking...');

      // Get current date and time
      const now = new Date();
      const bookingDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
      const bookingTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM

      // Prepare booking data for API
      const bookingData = {
        host_id: host.id,
        booking_date: bookingDate,
        booking_time: bookingTime,
        duration_hours: duration,
        activity_type: selectedActivity,
        location: location,
        notes: notes,
      };

      console.log('Booking data:', bookingData);

      // Submit to API
      const response = await api.post('/bookings', bookingData);
      console.log('✅ Booking created:', response.data);

      // Show success message
      Alert.alert(
        'Request Sent!',
        `Your booking request has been sent to ${host.name}. They'll respond soon!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      console.error('❌ Booking failed:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create booking. Please try again.';
      Alert.alert('Booking Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <LinearGradient
      colors={['#FDF1F8', '#FFF9F5', '#F3E9FF']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

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
          <Text style={styles.headerTitle}>Book Companion</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Host Info Card */}
        <View style={styles.hostCard}>
          <Image
            source={{
              uri: host.photo_base64
                ? `data:image/jpeg;base64,${host.photo_base64}`
                : host.photo || 'https://via.placeholder.com/100x100?text=No+Photo'
            }}
            style={styles.hostPhoto}
          />
          <View style={styles.hostInfo}>
            <Text style={styles.hostName}>{host.name}</Text>
            <Text style={styles.hostPrice}>₹{pricePerHour}/hour</Text>
          </View>
        </View>

        {/* ============================================ */}
        {/* ACTIVITY SELECTION */}
        {/* ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.optionsRow}>
            {host.activities.map(activityId => {
              const activity = activityTypes.find(a => a.id === activityId);
              const isSelected = selectedActivity === activityId;

              return (
                <TouchableOpacity
                  key={activityId}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedActivity(activityId)}
                >
                  <Text style={styles.optionEmoji}>{activity?.icon}</Text>
                  <Text style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}>
                    {activity?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================ */}
        {/* DURATION SELECTION */}
        {/* ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Duration</Text>
          <View style={styles.durationRow}>
            {[1, 2, 3, 4].map(hours => (
              <TouchableOpacity
                key={hours}
                style={[
                  styles.durationButton,
                  duration === hours && styles.durationButtonSelected,
                ]}
                onPress={() => setDuration(hours)}
              >
                <Text style={[
                  styles.durationText,
                  duration === hours && styles.durationTextSelected,
                ]}>
                  {hours}h
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ============================================ */}
        {/* LOCATION INPUT */}
        {/* ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meeting Location *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Starbucks, MG Road"
            placeholderTextColor={colors.text.light}
            value={location}
            onChangeText={setLocation}
          />
          <Text style={styles.helperText}>
            Enter a public place where you'll meet
          </Text>
        </View>

        {/* ============================================ */}
        {/* NOTES INPUT (Optional) */}
        {/* ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Any special requests or information..."
            placeholderTextColor={colors.text.light}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* ============================================ */}
        {/* PRICE BREAKDOWN */}
        {/* ============================================ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                ₹{pricePerHour} × {duration} hour{duration > 1 ? 's' : ''}
              </Text>
              <Text style={styles.priceValue}>₹{totalPrice}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Service fee</Text>
              <Text style={styles.priceValue}>₹0</Text>
            </View>
            <View style={styles.priceDivider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{totalPrice}</Text>
            </View>
            <Text style={styles.paymentNote}>💵 Pay in cash after meeting</Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />

      </ScrollView>

      {/* ============================================ */}
      {/* SUBMIT BUTTON */}
      {/* ============================================ */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isFormValid && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.submitButtonText}>
              Send Request • ₹{totalPrice}
            </Text>
          )}
        </TouchableOpacity>
        </View>

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
    backgroundColor: colors.background,
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

  // Host Card
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.small,
  },

  hostPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },

  hostInfo: {
    flex: 1,
  },

  hostName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  hostPrice: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },

  // Activity Options
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },

  optionButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.pastel.babyPink,
  },

  optionEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },

  optionText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
  },

  optionTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },

  // Duration
  durationRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },

  durationButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },

  durationButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  durationText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.secondary,
  },

  durationTextSelected: {
    color: colors.text.inverse,
  },

  // Input
  input: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.text.primary,
    ...shadows.small,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  helperText: {
    fontSize: typography.small,
    color: colors.text.light,
    marginTop: spacing.xs,
  },

  // Price Card
  priceCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  priceLabel: {
    fontSize: typography.body,
    color: colors.text.secondary,
  },

  priceValue: {
    fontSize: typography.body,
    color: colors.text.primary,
  },

  priceDivider: {
    height: 1,
    backgroundColor: colors.gray.light,
    marginVertical: spacing.sm,
  },

  totalLabel: {
    fontSize: typography.body,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  totalValue: {
    fontSize: typography.h3,
    fontWeight: 'bold',
    color: colors.text.primary,
  },

  paymentNote: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
  },

  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    ...shadows.small,
  },

  submitButtonDisabled: {
    backgroundColor: colors.gray.medium,
  },

  submitButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
