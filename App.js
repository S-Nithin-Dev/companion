// ============================================
// App.js - Entry point
// Now with Navigation and Authentication!
// ============================================

import React from 'react';

// Import Auth Provider
import { AuthProvider } from './src/context/AuthContext';

// Import our navigator
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
