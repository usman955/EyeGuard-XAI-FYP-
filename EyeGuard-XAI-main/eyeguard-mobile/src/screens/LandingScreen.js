/**
 * ============================================================================
 * File: LandingScreen.js
 * Location: screens
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { GlassCard } from '../components/GlassCard';
import { AnimatedButton } from '../components/AnimatedButton';

export const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={[theme.colors.background, theme.colors.surface]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}> Next-Gen AI Screening Platform</Text>
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
            onPress={() => navigation.navigate('Login')}
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
          <Text style={styles.cardText}>• Instant Retinal Analysis</Text>
          <Text style={styles.cardText}>• Chatbot Assistant</Text>
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
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    borderRadius: 100,
    marginBottom: theme.spacing.xl,
  },
  badgeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  titleHighlight: {
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
  },
  buttonContainer: {
    width: '100%',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xxl,
  },
  button: {
    width: '100%',
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    color: theme.colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
  },
  cardText: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    fontSize: 16,
  }
});
