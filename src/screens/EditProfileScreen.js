// ============================================
// EditProfileScreen.js
// Edit user profile information
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing, borderRadius, shadows, typography } from '../theme';

export default function EditProfileScreen({ navigation }) {

  // ============================================
  // FORM STATE (pre-filled with mock data)
  // ============================================

  const [name, setName] = useState('Nithin');
  const [email, setEmail] = useState('nithin@example.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('https://i.pravatar.cc/150?img=30');

  // Track if form has changes
  const [hasChanges, setHasChanges] = useState(false);

  // Update field and mark as changed
  const updateField = (setter, value) => {
    setter(value);
    setHasChanges(true);
  };

  // ============================================
  // HANDLERS
  // ============================================

  const handleSave = () => {
    // Validate required fields
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email is required');
      return;
    }

    // In real app, would save to backend
    const profileData = {
      name,
      email,
      phone,
      bio,
      photo,
    };

    console.log('Saving profile:', profileData);

    Alert.alert(
      'Profile Updated',
      'Your changes have been saved.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleChangePhoto = () => {
    Alert.alert(
      'Change Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.log('Camera') },
        { text: 'Choose from Library', onPress: () => console.log('Gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
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
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Profile Photo */}
          <View style={styles.photoSection}>
            <Image source={{ uri: photo }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.changePhotoButton}
              onPress={handleChangePhoto}
            >
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>

            {/* Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                placeholderTextColor={colors.text.light}
                value={name}
                onChangeText={(value) => updateField(setName, value)}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={colors.text.light}
                value={email}
                onChangeText={(value) => updateField(setEmail, value)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91 XXXXX XXXXX"
                placeholderTextColor={colors.text.light}
                value={phone}
                onChangeText={(value) => updateField(setPhone, value)}
                keyboardType="phone-pad"
              />
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tell others about yourself..."
                placeholderTextColor={colors.text.light}
                value={bio}
                onChangeText={(value) => updateField(setBio, value)}
                multiline
                numberOfLines={4}
              />
            </View>

          </View>

          {/* Bottom spacing */}
          <View style={{ height: 100 }} />

        </ScrollView>

        {/* Save Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              !hasChanges && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
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

  // Photo Section
  photoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.pastel.babyPink,
    marginBottom: spacing.md,
  },

  changePhotoButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.pill,
    backgroundColor: colors.pastel.softLilac,
  },

  changePhotoText: {
    fontSize: typography.caption,
    fontWeight: '600',
    color: colors.text.primary,
  },

  // Form
  form: {
    paddingHorizontal: spacing.lg,
  },

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
    height: 100,
    textAlignVertical: 'top',
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

  saveButtonDisabled: {
    backgroundColor: colors.gray.medium,
  },

  saveButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.text.inverse,
  },
});
