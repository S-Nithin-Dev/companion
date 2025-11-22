// ============================================
// THEME - Our app's design system
// All colors, sizes, and styles in one place
// ============================================

// COLORS - The pastel palette you wanted
export const colors = {
  // Main pastel colors
  pastel: {
    lemonYellow: '#FFE97F',
    babyPink: '#FFCEE0',
    softLilac: '#F3E9FF',
    mintAqua: '#C9FFF4',
    paleCream: '#FFF7CC',
  },

  // Primary action color (coral/salmon)
  primary: '#FF6B6B',
  coral: '#FF6B6B',

  // Background colors
  background: '#FDF1F8',
  white: '#FFFFFF',

  // Text colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    light: '#999999',
    inverse: '#FFFFFF',
  },

  // Status colors
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',

  // Gray shades
  gray: {
    light: '#F5F5F5',
    medium: '#CCCCCC',
    dark: '#888888',
  },
};

// SPACING - Consistent spacing throughout app
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// BORDER RADIUS - Rounded corners
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,  // Fully rounded (for pills/buttons)
};

// SHADOWS - For depth and elevation
export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,  // Android shadow
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};

// TYPOGRAPHY - Font sizes
export const typography = {
  h1: 32,
  h2: 24,
  h3: 20,
  body: 16,
  caption: 14,
  small: 12,
};
