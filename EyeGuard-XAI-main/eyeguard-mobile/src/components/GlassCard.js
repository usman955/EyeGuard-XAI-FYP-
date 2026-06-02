/**
 * ============================================================================
 * File: GlassCard.js
 * Location: components
 * Purpose: Reusable UI component for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { theme } from '../utils/theme';

export const GlassCard = ({ children, style, intensity = 40 }) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint="light" style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.l,
    overflow: 'hidden',
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    backgroundColor: theme.colors.surfaceGlass,
    ...theme.shadows.glass,
  },
  blur: {
    padding: theme.spacing.m,
  }
});
