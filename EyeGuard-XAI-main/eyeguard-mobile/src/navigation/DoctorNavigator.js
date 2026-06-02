import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Image as ImageIcon, Clock, BrainCircuit, MessageSquare } from 'lucide-react-native';
import ChatScreen from '../screens/user/ChatScreen';
import { theme } from '../utils/theme';

import DoctorDashboard from '../screens/doctor/DoctorDashboard';
import PatientUploadScreen from '../screens/doctor/PatientUploadScreen';
import DoctorHistoryScreen from '../screens/doctor/DoctorHistoryScreen';

const Tab = createBottomTabNavigator();

// We will map History to DoctorRetinalScans temporarily if it doesn't exist, but we will create it next.
export const DoctorNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="DoctorHome" 
        component={DoctorDashboard} 
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="UploadScan" 
        component={PatientUploadScreen} 
        options={{
          tabBarLabel: 'New Scan',
          tabBarIcon: ({ color, size }) => <ImageIcon color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="History" 
        component={DoctorHistoryScreen} 
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="DoctorAssistant" 
        component={ChatScreen} 
        options={{
          tabBarLabel: 'XAI Assistant',
          tabBarIcon: ({ color, size }) => <BrainCircuit color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};
