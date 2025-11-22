// ============================================
// AvailabilityScreen.js
// Set weekly availability schedule
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function AvailabilityScreen({ navigation }) {

  // ============================================
  // SCHEDULE STATE
  // ============================================

  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: '09:00', end: '18:00' },
    tuesday: { enabled: true, start: '09:00', end: '18:00' },
    wednesday: { enabled: true, start: '09:00', end: '18:00' },
    thursday: { enabled: true, start: '09:00', end: '18:00' },
    friday: { enabled: true, start: '09:00', end: '20:00' },
    saturday: { enabled: true, start: '10:00', end: '22:00' },
    sunday: { enabled: false, start: '10:00', end: '18:00' },
  });

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00', '23:00',
  ];

  // Toggle day enabled/disabled
  const toggleDay = (day) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        enabled: !schedule[day].enabled,
      },
    });
  };

  // Update time for a day
  const updateTime = (day, type, value) => {
    setSchedule({
      ...schedule,
      [day]: {
        ...schedule[day],
        [type]: value,
      },
    });
  };

  // Show time picker (simplified - just cycles through times)
  const showTimePicker = (day, type) => {
    const options = timeSlots.map(time => ({
      text: time,
      onPress: () => updateTime(day, type, time),
    }));

    Alert.alert(
      `Select ${type === 'start' ? 'Start' : 'End'} Time`,
      '',
      [...options.slice(0, 6), { text: 'Cancel', style: 'cancel' }]
    );
  };

  // Save schedule
  const handleSave = () => {
    console.log('Saving schedule:', schedule);
    Alert.alert(
      'Schedule Saved',
      'Your availability has been updated.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
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
            <Text style={styles.headerTitle}>Availability</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>
              Set your weekly availability. Clients can only book you during these hours.
            </Text>
          </View>

          {/* Schedule */}
          <View style={styles.scheduleContainer}>
            {days.map(day => (
              <View key={day.key} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <Text style={[
                    styles.dayName,
                    !schedule[day.key].enabled && styles.dayNameDisabled,
                  ]}>
                    {day.label}
                  </Text>
                  <Switch
                    value={schedule[day.key].enabled}
                    onValueChange={() => toggleDay(day.key)}
                    trackColor={{
                      false: colors.gray.medium,
                      true: colors.pastel.mintAqua,
                    }}
                    thumbColor={schedule[day.key].enabled ? colors.primary : colors.white}
                  />
                </View>

                {schedule[day.key].enabled && (
                  <View style={styles.timeRow}>
                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => showTimePicker(day.key, 'start')}
                    >
                      <Text style={styles.timeLabel}>From</Text>
                      <Text style={styles.timeValue}>{schedule[day.key].start}</Text>
                    </TouchableOpacity>

                    <Text style={styles.timeSeparator}>to</Text>

                    <TouchableOpacity
                      style={styles.timeButton}
                      onPress={() => showTimePicker(day.key, 'end')}
                    >
                      <Text style={styles.timeLabel}>To</Text>
                      <Text style={styles.timeValue}>{schedule[day.key].end}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* Save Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Schedule</Text>
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

  // Info Card
  infoCard: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.pastel.softLilac,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },

  infoText: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  // Schedule
  scheduleContainer: {
    paddingHorizontal: spacing.lg,
  },

  dayCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },

  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dayName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  dayNameDisabled: {
    color: colors.text.light,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray.light,
  },

  timeButton: {
    flex: 1,
    backgroundColor: colors.pastel.paleCream,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
  },

  timeLabel: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginBottom: 2,
  },

  timeValue: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
  },

  timeSeparator: {
    fontSize: typography.caption,
    color: colors.text.light,
    marginHorizontal: spacing.sm,
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

  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    ...shadows.small,
  },

  saveButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
