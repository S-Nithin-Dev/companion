// ============================================
// App.js - Entry point
// Now with Navigation!
// ============================================

import React from 'react';

// Import our navigator
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  // The navigator handles which screen to show
  return <AppNavigator />;
}
