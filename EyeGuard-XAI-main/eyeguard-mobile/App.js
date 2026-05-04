/**
 * ============================================================================
 * File: App.js
 * Location: eyeguard-mobile
 * Purpose: Core configuration, initialization, or entry point for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import ScreeningScreen from './src/screens/ScreeningScreen';

// Icons
import { Home, MessageCircle, Scan } from 'lucide-react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#5D1F1A',
      tabBarInactiveTintColor: '#94a3b8',
      tabBarStyle: {
        height: 70,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 10,
      }
    }}
  >
    <Tab.Screen 
      name="Dashboard" 
      component={HomeScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        headerTitle: 'EyeGuard'
      }}
    />
    <Tab.Screen 
      name="Screening" 
      component={ScreeningScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <Scan color={color} size={size} />,
      }}
    />
    <Tab.Screen 
      name="AI Assistant" 
      component={ChatScreen} 
      options={{
        tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5D1F1A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <AppContent />
    </AuthProvider>
  );
}
