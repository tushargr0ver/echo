import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import MainApp from './app/main';

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
      <StatusBar style="light" />
    </AuthProvider>
  );
} 