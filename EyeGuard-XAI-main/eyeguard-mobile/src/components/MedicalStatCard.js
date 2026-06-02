import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';
import { GlassCard } from './GlassCard';

export const MedicalStatCard = ({ title, value, icon, color = theme.colors.primary }) => {
  return (
    <GlassCard style={styles.card} intensity={70}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        {icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    margin: theme.spacing.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  title: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  }
});
