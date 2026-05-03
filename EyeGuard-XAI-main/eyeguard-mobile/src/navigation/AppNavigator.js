import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { theme } from '../utils/theme';

// Screens
import { LandingScreen } from '../screens/LandingScreen';
// Using inline simple components for the remaining screens to complete the structure quickly

import { View, Text, StyleSheet } from 'react-native';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createNativeStackNavigator();

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  return (
    <LinearGradient colors={[theme.colors.background, theme.colors.backgroundSecondary]} style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <AnimatedButton onPress={() => login('doctor@eyeguard.com', 'password')} style={{marginBottom:10}}>
          Demo Doctor Login
        </AnimatedButton>
        <AnimatedButton variant="secondary" onPress={() => login('user@eyeguard.com', 'password')} style={{marginBottom:10}}>
          Demo User Login
        </AnimatedButton>
        <AnimatedButton variant="secondary" onPress={() => navigation.navigate('Landing')}>Back</AnimatedButton>
      </GlassCard>
    </LinearGradient>
  );
};

const RegisterScreen = ({ navigation }) => {
  const { register } = useAuth();
  return (
    <LinearGradient colors={[theme.colors.background, theme.colors.backgroundSecondary]} style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <AnimatedButton onPress={() => register('New User', 'test@eyeguard.com', 'password', 'user')} style={{marginBottom:10}}>
          Register Dummy User
        </AnimatedButton>
        <AnimatedButton variant="secondary" onPress={() => navigation.navigate('Landing')}>Back</AnimatedButton>
      </GlassCard>
    </LinearGradient>
  );
};

const DoctorDashboard = () => {
  const { logout } = useAuth();
  return (
    <LinearGradient colors={[theme.colors.background, theme.colors.backgroundSecondary]} style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.title}>Doctor Portal</Text>
        <Text style={{color: 'white', marginBottom: 20}}>Welcome to the mobile clinical dashboard. Use the web interface for detailed Grad-CAM analysis.</Text>
        <AnimatedButton onPress={logout}>Logout</AnimatedButton>
      </GlassCard>
    </LinearGradient>
  );
};

const UserDashboard = () => {
  const { logout } = useAuth();
  return (
    <LinearGradient colors={[theme.colors.background, theme.colors.backgroundSecondary]} style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.title}>User Dashboard</Text>
        <Text style={{color: 'white', marginBottom: 20}}>Educational chatbot and mobile risk assessment available here.</Text>
        <AnimatedButton onPress={logout}>Logout</AnimatedButton>
      </GlassCard>
    </LinearGradient>
  );
};

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
        <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
      ) : (
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.accentPrimary, marginBottom: 20 }
});
