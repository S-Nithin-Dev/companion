// ============================================
// HostSetupScreen.js
// Multi-step form to become a host
// ============================================

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';
import { activityTypes } from '../data/mockData';
import hostService from '../services/hostService';

export default function HostSetupScreen({ navigation }) {

  // ============================================
  // FORM STATE
  // ============================================

  // Current step in the wizard (1, 2, or 3)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Basic Info
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  // Step 2: Activities (array of selected activity IDs)
  const [selectedActivities, setSelectedActivities] = useState([]);

  // Step 3: Languages
  const [languages, setLanguages] = useState([]);

  const availableLanguages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Marathi'];

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================
  // HELPER FUNCTIONS
  // ============================================

  // Toggle activity selection
  const toggleActivity = (activityId) => {
    if (selectedActivities.includes(activityId)) {
      // Remove if already selected
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    } else {
      // Add if not selected
      setSelectedActivities([...selectedActivities, activityId]);
    }
  };

  // Toggle language selection
  const toggleLanguage = (language) => {
    if (languages.includes(language)) {
      setLanguages(languages.filter(l => l !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bio.trim().length >= 20 && hourlyRate.length > 0;
      case 2:
        return selectedActivities.length >= 1;
      case 3:
        return languages.length >= 1;
      default:
        return false;
    }
  };

  // Handle next step or submit
  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the form
      handleSubmit();
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    const hostData = {
      bio,
      hourly_rate: parseInt(hourlyRate),
      activities: selectedActivities,
      languages,
    };

    console.log('📝 Creating host profile:', hostData);

    setIsSubmitting(true);

    try {
      // Create host profile via API
      await hostService.createHost(hostData);

      // Automatically activate host mode
      try {
        await hostService.toggleHostMode();
        console.log('✅ Host profile created and activated!');
      } catch (toggleError) {
        console.log('⚠️ Profile created but toggle failed:', toggleError.message);
      }

      Alert.alert(
        'Success! 🎉',
        'Your host profile has been created and activated. You are now visible to others!',
        [
          {
            text: 'View Profile',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
              setTimeout(() => navigation.navigate('Profile'), 100);
            },
          },
        ]
      );
    } catch (error) {
      console.error('❌ Create host error:', error);

      const errorMessage = error.response?.data?.error || 'Failed to create host profile. Please try again.';

      Alert.alert('Error', errorMessage, [
        {
          text: 'OK',
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // RENDER STEPS
  // ============================================

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Tell us about yourself</Text>
      <Text style={styles.stepSubtitle}>
        This will be shown on your profile
      </Text>

      {/* Bio Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="I love meeting new people! Tell others about your interests, hobbies, and what makes you a great companion..."
          placeholderTextColor={colors.text.light}
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={5}
        />
        <Text style={styles.charCount}>
          {bio.length}/20 minimum characters
        </Text>
      </View>

      {/* Hourly Rate Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Hourly Rate (₹) *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., 200"
          placeholderTextColor={colors.text.light}
          value={hourlyRate}
          onChangeText={setHourlyRate}
          keyboardType="numeric"
        />
        <Text style={styles.helperText}>
          Average rate is ₹150-300 per hour
        </Text>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>What activities do you offer?</Text>
      <Text style={styles.stepSubtitle}>
        Select at least one activity
      </Text>

      <View style={styles.optionsGrid}>
        {activityTypes
          .filter(activity => activity.id !== 'all')
          .map(activity => {
            const isSelected = selectedActivities.includes(activity.id);
            return (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                ]}
                onPress={() => toggleActivity(activity.id)}
              >
                <Text style={styles.optionEmoji}>{activity.icon}</Text>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}>
                  {activity.name}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
      </View>

      <Text style={styles.selectedCount}>
        {selectedActivities.length} selected
      </Text>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Languages you speak</Text>
      <Text style={styles.stepSubtitle}>
        Select all that apply
      </Text>

      <View style={styles.languageGrid}>
        {availableLanguages.map(language => {
          const isSelected = languages.includes(language);
          return (
            <TouchableOpacity
              key={language}
              style={[
                styles.languageChip,
                isSelected && styles.languageChipSelected,
              ]}
              onPress={() => toggleLanguage(language)}
            >
              <Text style={[
                styles.languageText,
                isSelected && styles.languageTextSelected,
              ]}>
                {language}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.selectedCount}>
        {languages.length} selected
      </Text>
    </View>
  );

  // ============================================
  // MAIN RENDER
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
              onPress={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                } else {
                  navigation.goBack();
                }
              }}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Become a Host</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${(currentStep / 3) * 100}%` }
              ]} />
            </View>
            <Text style={styles.progressText}>Step {currentStep} of 3</Text>
          </View>

          {/* Step Content */}
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!isStepValid() || isSubmitting) && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={!isStepValid() || isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.nextButtonText}>
                {currentStep === 3 ? 'Submit Application' : 'Next'}
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

  // Progress
  progressContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },

  progressBar: {
    height: 6,
    backgroundColor: colors.gray.light,
    borderRadius: 3,
    marginBottom: spacing.xs,
  },

  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },

  progressText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'right',
  },

  // Step Content
  stepContent: {
    paddingHorizontal: spacing.lg,
  },

  stepTitle: {
    fontSize: typography.h2,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },

  stepSubtitle: {
    fontSize: typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },

  // Input
  inputGroup: {
    marginBottom: spacing.lg,
  },

  inputLabel: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.text.primary,
    ...shadows.small,
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  charCount: {
    fontSize: typography.small,
    color: colors.text.light,
    marginTop: spacing.xs,
    textAlign: 'right',
  },

  helperText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },

  // Options Grid
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  optionCard: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },

  optionCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.pastel.babyPink,
  },

  optionEmoji: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },

  optionText: {
    fontSize: typography.small,
    color: colors.text.secondary,
    textAlign: 'center',
  },

  optionTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },

  checkmark: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkmarkText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },

  selectedCount: {
    fontSize: typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },

  // Language Grid
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },

  languageChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.pill,
    borderWidth: 2,
    borderColor: 'transparent',
    ...shadows.small,
  },

  languageChipSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.pastel.softLilac,
  },

  languageText: {
    fontSize: typography.body,
    color: colors.text.secondary,
  },

  languageTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
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

  nextButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.pill,
    alignItems: 'center',
    ...shadows.small,
  },

  nextButtonDisabled: {
    backgroundColor: colors.gray.medium,
  },

  nextButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
