import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { theme } from '../utils/theme';
import { AnimatedButton } from '../components/AnimatedButton';
import { GlassCard } from '../components/GlassCard';
import { Stethoscope, User, Mail, Lock, ArrowRight, ArrowLeft, BadgeCheck } from 'lucide-react-native';

const RegisterScreen = ({ navigation }) => {
  const [role, setRole] = useState('user'); // 'doctor' or 'user'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [license, setLicense] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth(); // Changed from register to signup to match AuthContext

  const calculatePasswordStrength = (pass) => {
    if (!pass) return '';
    if (pass.length < 6) return 'Weak';
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[^A-Za-z0-9]/.test(pass);
    
    let score = 0;
    if (hasUpper) score++;
    if (hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;
    
    if (pass.length >= 10 && score === 4) return 'Very Strong';
    if (pass.length >= 8 && score >= 3) return 'Strong';
    if (pass.length >= 6 && score >= 2) return 'Good';
    return 'Weak';
  };

  const handlePasswordChange = (val) => {
    setPassword(val);
    setPasswordStrength(calculatePasswordStrength(val));
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (role === 'doctor' && !license.trim()) {
      setError('Medical license is required for doctors.');
      return;
    }

    if (passwordStrength === 'Weak') {
      setError('Please choose a stronger password.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    try {
      await signup({ name, email, password, role, license });
      // Show success message and navigate to Login with pre-filled data
      alert('Registration successful! Please sign in with your new credentials.');
      navigation.navigate('Login', { 
        prefilledEmail: email.trim().toLowerCase(), 
        prefilledRole: role 
      });
    } catch (err) {
      setError(err.message || 'Registration failed.');
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft color={theme.colors.primary} size={24} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Join EyeGuard</Text>
            <Text style={styles.subtitle}>Create your clinical account</Text>
          </View>

          <GlassCard style={styles.formCard} intensity={90}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            {/* Role Selection */}
            <View style={styles.modeGrid}>
              <TouchableOpacity 
                style={[styles.modeButton, role === 'doctor' && styles.modeButtonActive]}
                onPress={() => setRole('doctor')}
              >
                <Stethoscope color={role === 'doctor' ? theme.colors.primaryDark : theme.colors.textMuted} size={24} />
                <Text style={[styles.modeTitle, role === 'doctor' && styles.modeTitleActive]}>Doctor</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modeButton, role === 'user' && styles.modeButtonActive]}
                onPress={() => setRole('user')}
              >
                <User color={role === 'user' ? theme.colors.primaryDark : theme.colors.textMuted} size={24} />
                <Text style={[styles.modeTitle, role === 'user' && styles.modeTitleActive]}>Patient</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputContainer}>
              <User color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                value={name}
                onChangeText={setName}
              />
            </View>

            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={styles.inputContainer}>
              <Mail color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            {role === 'doctor' && (
              <>
                <Text style={styles.label}>MEDICAL LICENSE</Text>
                <View style={styles.inputContainer}>
                  <BadgeCheck color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. MD-123456"
                    value={license}
                    onChangeText={setLicense}
                  />
                </View>
              </>
            )}

            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputContainer}>
              <Lock color={theme.colors.textMuted} size={18} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
            </View>

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBarWrapper}>
                  <View style={[styles.strengthBar, { flex: 1, backgroundColor: passwordStrength === 'Weak' ? theme.colors.error : (passwordStrength === 'Good' ? '#fbbf24' : '#10b981') }]} />
                  <View style={[styles.strengthBar, { flex: 1, backgroundColor: (passwordStrength === 'Good' || passwordStrength === 'Strong' || passwordStrength === 'Very Strong') ? (passwordStrength === 'Good' ? '#fbbf24' : '#10b981') : theme.colors.border }]} />
                  <View style={[styles.strengthBar, { flex: 1, backgroundColor: (passwordStrength === 'Strong' || passwordStrength === 'Very Strong') ? '#10b981' : theme.colors.border }]} />
                  <View style={[styles.strengthBar, { flex: 1, backgroundColor: passwordStrength === 'Very Strong' ? '#059669' : theme.colors.border }]} />
                </View>
                <Text style={[styles.strengthText, { color: passwordStrength === 'Weak' ? theme.colors.error : (passwordStrength === 'Good' ? '#d97706' : '#059669') }]}>
                  {passwordStrength}
                </Text>
              </View>
            )}

            {isLoading ? (
              <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : (
              <AnimatedButton onPress={handleRegister} style={styles.registerBtn}>
                <View style={styles.btnContent}>
                  <Text style={styles.btnText}>Create Account</Text>
                  <ArrowRight color="#fff" size={18} />
                </View>
              </AnimatedButton>
            )}
          </GlassCard>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  scrollContent: { padding: theme.spacing.m, paddingVertical: 60 },
  backBtn: { marginBottom: 20 },
  header: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: theme.colors.text },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, marginTop: 4 },
  formCard: { padding: 24, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.95)' },
  modeGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  modeButton: { flex: 1, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 16, padding: 12, alignItems: 'center' },
  modeButtonActive: { borderColor: theme.colors.primaryDark, backgroundColor: theme.colors.primaryLight, borderWidth: 2 },
  modeTitle: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textSecondary, marginTop: 4 },
  modeTitleActive: { color: theme.colors.primaryDark },
  label: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 6 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: theme.colors.border, borderRadius: 8, marginBottom: 16, paddingHorizontal: 12, height: 48 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 15, color: theme.colors.text },
  registerBtn: { marginTop: 10, backgroundColor: theme.colors.primaryDark, borderRadius: 30, paddingVertical: 14 },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  errorText: { color: theme.colors.error, fontSize: 13, textAlign: 'center', marginBottom: 16 },
  strengthContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, marginTop: -8 },
  strengthBarWrapper: { flex: 1, flexDirection: 'row', gap: 4, h: 4 },
  strengthBar: { height: 4, borderRadius: 2 },
  strengthText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
});

export default RegisterScreen;
