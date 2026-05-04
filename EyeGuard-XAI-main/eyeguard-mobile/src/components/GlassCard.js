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

export const GlassCard = ({ children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={20} tint="dark" style={styles.blur}>
        {children}
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    borderColor: theme.colors.surfaceBorder,
    borderWidth: 1,
    backgroundColor: theme.colors.surface,
  },
  blur: {
    padding: theme.spacing.lg,
  }
});
