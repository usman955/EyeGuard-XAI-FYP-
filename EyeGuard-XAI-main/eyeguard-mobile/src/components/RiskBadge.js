import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../utils/theme';

export const RiskBadge = ({ riskLevel }) => {
  let backgroundColor, textColor;

  switch (riskLevel.toLowerCase()) {
    case 'high':
      backgroundColor = theme.colors.dangerLight;
      textColor = theme.colors.danger;
      break;
    case 'medium':
      backgroundColor = theme.colors.warningLight;
      textColor = theme.colors.warning;
      break;
    case 'low':
      backgroundColor = theme.colors.successLight;
      textColor = theme.colors.success;
      break;
    default:
      backgroundColor = theme.colors.infoLight;
      textColor = theme.colors.info;
  }

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>
        {riskLevel.toUpperCase()} RISK
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  }
});
