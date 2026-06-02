import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../utils/theme';
import { GlassCard } from './GlassCard';

export const AIPredictionCard = ({ disease, probability, risk }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: probability,
      duration: 1000,
      useNativeDriver: false, // width cannot use native driver
    }).start();
  }, [probability]);

  const getBarColor = () => {
    if (probability > 75) return theme.colors.danger;
    if (probability > 40) return theme.colors.warning;
    return theme.colors.success;
  };

  return (
    <GlassCard style={styles.container} intensity={60}>
      <View style={styles.header}>
        <Text style={styles.diseaseName}>{disease}</Text>
        <Text style={[styles.probability, { color: getBarColor() }]}>
          {probability}%
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              backgroundColor: getBarColor(),
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        />
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.m,
    padding: theme.spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  probability: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  }
});
