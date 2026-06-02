import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Scan, MessageCircle } from 'lucide-react-native';
import { theme } from '../utils/theme';

// Import Screens (to be created)
import UserHomeScreen from '../screens/user/UserHomeScreen';
import UserScreeningScreen from '../screens/user/UserScreeningScreen';
import ChatScreen from '../screens/user/ChatScreen';

const Tab = createBottomTabNavigator();

export const UserNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen 
        name="UserHome" 
        component={UserHomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="UserScreening" 
        component={UserScreeningScreen} 
        options={{
          tabBarLabel: 'Screening',
          tabBarIcon: ({ color, size }) => <Scan color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Assistant" 
        component={ChatScreen} 
        options={{
          tabBarLabel: 'AI Chat',
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
