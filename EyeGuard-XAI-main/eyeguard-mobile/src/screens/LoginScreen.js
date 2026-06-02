import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { theme } from '../utils/theme';
import { AnimatedButton } from '../components/AnimatedButton';
import { GlassCard } from '../components/GlassCard';
import { Stethoscope, User, Mail, Lock, ArrowRight } from 'lucide-react-native';

const LoginScreen = ({ navigation, route }) => {
  const [selectedMode, setSelectedMode] = useState('doctor'); // 'doctor' or 'user'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // Pre-fill data if coming from registration
  React.useEffect(() => {
    if (route.params?.prefilledEmail) {
      setEmail(route.params.prefilledEmail);
    }
    if (route.params?.prefilledRole) {
      setSelectedMode(route.params.prefilledRole);
    }
  }, [route.params]);

  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password, selectedMode);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient 
        colors={[theme.colors.primaryLight, theme.colors.background]} 
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>EyeGuard<Text style={{color: theme.colors.primary}}>-XAI</Text></Text>
            <Text style={styles.subtitle}>Intelligent Retinal Screening</Text>
          </View>

          <GlassCard style={styles.formCard} intensity={90}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Welcome</Text>
              <Text style={styles.cardSubtitle}>Select your access mode to continue</Text>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            {/* Mode Selection Grid */}
            <View style={styles.modeGrid}>
              <TouchableOpacity 
                style={[styles.modeButton, selectedMode === 'doctor' && styles.modeButtonActive]}
                onPress={() => setSelectedMode('doctor')}
                activeOpacity={0.7}
              >
                <Stethoscope 
                  color={selectedMode === 'doctor' ? theme.colors.primaryDark : theme.colors.textMuted} 
                  size={28} 
                  style={{ marginBottom: 8 }} 
                />
                <Text style={[styles.modeTitle, selectedMode === 'doctor' && styles.modeTitleActive]}>
                  Medical Professional
                </Text>
                <Text style={styles.modeDesc}>High Density Data</Text>
                {selectedMode === 'doctor' && <View style={styles.activeDot} />}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modeButton, selectedMode === 'user' && styles.modeButtonActive]}
                onPress={() => setSelectedMode('user')}
                activeOpacity={0.7}
              >
                <User 
                  color={selectedMode === 'user' ? theme.colors.primaryDark : theme.colors.textMuted} 
                  size={28} 
                  style={{ marginBottom: 8 }} 
                />
                <Text style={[styles.modeTitle, selectedMode === 'user' && styles.modeTitleActive]}>
                  General User
                </Text>
                <Text style={styles.modeDesc}>Simple Educational</Text>
                {selectedMode === 'user' && <View style={styles.activeDot} />}
              </TouchableOpacity>
            </View>

            {/* Login Form */}
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={styles.inputContainer}>
              <Mail color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={selectedMode === 'doctor' ? "doctor@eyeguard.com" : "user@eyeguard.com"}
                placeholderTextColor={theme.colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputContainer}>
              <Lock color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={theme.colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.optionsRow}>
              <Text style={styles.forgotPassword}>Forgot password?</Text>
            </View>

            {isLoading ? (
              <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : (
              <AnimatedButton 
                onPress={handleLogin} 
                style={styles.loginBtn}
              >
                <View style={styles.btnContent}>
                  <Text style={styles.btnText}>Sign In</Text>
                  <ArrowRight color="#fff" size={18} />
                </View>
              </AnimatedButton>
            )}

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Register here</Text>
              </TouchableOpacity>
            </View>

          </GlassCard>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.m,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  formCard: {
    padding: theme.spacing.l,
    width: '100%',
    borderRadius: theme.borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  modeGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: theme.spacing.l,
  },
  modeButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    position: 'relative',
  },
  modeButtonActive: {
    borderColor: theme.colors.primaryDark,
    borderWidth: 2,
    backgroundColor: theme.colors.primaryLight,
  },
  modeTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  modeTitleActive: {
    color: theme.colors.primaryDark,
  },
  modeDesc: {
    fontSize: 10,
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primaryDark,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.border,
    borderRadius: 8,
    marginBottom: theme.spacing.m,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: theme.colors.text,
    height: '100%',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing.m,
    marginTop: -4,
  },
  forgotPassword: {
    fontSize: 13,
    color: theme.colors.primaryDark,
    fontWeight: '600',
  },
  loginBtn: {
    marginTop: theme.spacing.s,
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 30,
    paddingVertical: 14,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
  },
  registerText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: theme.colors.primaryDark,
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
    fontWeight: '500',
  }
});

export default LoginScreen;
