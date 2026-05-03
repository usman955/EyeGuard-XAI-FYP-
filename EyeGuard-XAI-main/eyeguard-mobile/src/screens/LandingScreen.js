import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';

export const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.backgroundSecondary]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Next-Gen AI Screening Platform</Text>
        </View>

        <Text style={styles.title}>
          See The Future With{'\n'}
          <Text style={styles.titleHighlight}>EyeGuard-XAI</Text>
        </Text>

        <Text style={styles.subtitle}>
          Reliable & Explainable Retinal Disease Screening System.
        </Text>

        <View style={styles.buttonContainer}>
          <AnimatedButton 
            variant="primary" 
            style={styles.button}
            onPress={() => navigation.navigate('Register')}
          >
            Start Screening Now
          </AnimatedButton>
          <AnimatedButton 
            variant="secondary" 
            style={styles.button}
            onPress={() => navigation.navigate('Login')}
          >
            Sign In
          </AnimatedButton>
        </View>

        <GlassCard style={styles.card}>
          <Text style={styles.cardTitle}>Mobile Features</Text>
          <Text style={styles.cardText}>• Instant Analysis via Camera</Text>
          <Text style={styles.cardText}>• On-the-go Chatbot Assistant</Text>
          <Text style={styles.cardText}>• Explainable AI Heatmaps</Text>
        </GlassCard>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    borderColor: 'rgba(0, 212, 255, 0.2)',
    borderWidth: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    marginBottom: theme.spacing.xl,
  },
  badgeText: {
    color: theme.colors.accentPrimary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  titleHighlight: {
    color: theme.colors.accentPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.xxl,
  },
  button: {
    width: '100%',
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    color: theme.colors.accentPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontSize: 16,
  }
});
