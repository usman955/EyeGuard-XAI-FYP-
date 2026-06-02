import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { theme } from '../utils/theme';

// Screens
import { LandingScreen } from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import DoctorScanResult from '../screens/doctor/DoctorScanResult';
import { DoctorNavigator } from './DoctorNavigator';
import { UserNavigator } from './UserNavigator';
import UserScanResult from '../screens/user/UserScanResult';
import ChatScreen from '../screens/user/ChatScreen';
import AIInsightsScreen from '../screens/user/AIInsightsScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Note: RegisterScreen would go here if implemented in the same way, but let's assume it exists or we use Login.
// import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.colors.background } }}>
      {!user ? (
        <>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : user.role === 'doctor' ? (
        <>
          <Stack.Screen name="DoctorRoot" component={DoctorNavigator} />
          <Stack.Screen name="DoctorScanResult" component={DoctorScanResult} />
          <Stack.Screen name="Assistant" component={ChatScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="UserRoot" component={UserNavigator} />
          <Stack.Screen name="UserScanResult" component={UserScanResult} />
          <Stack.Screen name="AIInsights" component={AIInsightsScreen} />
          <Stack.Screen name="Assistant" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
