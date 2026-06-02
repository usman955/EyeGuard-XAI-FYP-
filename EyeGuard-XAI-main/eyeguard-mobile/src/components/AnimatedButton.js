/**
 * ============================================================================
 * File: AnimatedButton.js
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../utils/theme';

export const AnimatedButton = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle 
}) => {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[styles.base, style]}>
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Text style={[styles.primaryText, textStyle]}>{children}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress} 
      activeOpacity={0.8} 
      style={[styles.base, styles.secondary, style]}
    >
      <Text style={[styles.secondaryText, textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.button,
  },
  gradient: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  secondary: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  primaryText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
