import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../utils/theme';
import { GlassCard } from './GlassCard';
import { Eye, Activity, Columns } from 'lucide-react-native';

export const HeatmapOverlay = ({ originalSource, heatmapSource }) => {
  const [viewMode, setViewMode] = useState('overlay'); // 'original', 'overlay', 'side-by-side'

  return (
    <GlassCard style={styles.container}>
      {viewMode === 'side-by-side' ? (
        <View style={styles.sideBySideContainer}>
          <View style={styles.halfImageContainer}>
            <Text style={styles.label}>Original</Text>
            <Image source={originalSource} style={styles.halfImage} resizeMode="cover" />
          </View>
          <View style={styles.halfImageContainer}>
            <Text style={styles.label}>Grad-CAM</Text>
            <Image source={heatmapSource} style={styles.halfImage} resizeMode="cover" />
          </View>
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={originalSource} style={styles.mainImage} resizeMode="cover" />
          {viewMode === 'overlay' && (
            <Image 
              source={heatmapSource} 
              style={[styles.mainImage, styles.overlayImage]} 
              resizeMode="cover" 
            />
          )}
          <View style={styles.floatingBadge}>
            <Text style={styles.floatingBadgeText}>
              {viewMode === 'original' ? 'Original Scan' : 'Grad-CAM Analysis'}
            </Text>
          </View>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.toggleBtn, viewMode === 'original' && styles.activeBtn]}
          onPress={() => setViewMode('original')}
        >
          <Eye size={20} color={viewMode === 'original' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.toggleText, viewMode === 'original' && styles.activeText]}>Original</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleBtn, viewMode === 'overlay' && styles.activeBtn]}
          onPress={() => setViewMode('overlay')}
        >
          <Activity size={20} color={viewMode === 'overlay' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.toggleText, viewMode === 'overlay' && styles.activeText]}>Overlay</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.toggleBtn, viewMode === 'side-by-side' && styles.activeBtn]}
          onPress={() => setViewMode('side-by-side')}
        >
          <Columns size={20} color={viewMode === 'side-by-side' ? '#fff' : theme.colors.textSecondary} />
          <Text style={[styles.toggleText, viewMode === 'side-by-side' && styles.activeText]}>Split</Text>
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlayImage: {
    opacity: 0.6, // Blend original with heatmap
  },
  sideBySideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 250,
  },
  halfImageContainer: {
    width: '48%',
    height: '100%',
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: '#000',
    position: 'relative',
  },
  halfImage: {
    width: '100%',
    height: '100%',
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 10,
    zIndex: 10,
    fontWeight: 'bold',
  },
  floatingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(14, 165, 233, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  floatingBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: theme.spacing.m,
    paddingHorizontal: theme.spacing.xs,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: theme.colors.border,
  },
  activeBtn: {
    backgroundColor: theme.colors.primary,
  },
  toggleText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  activeText: {
    color: '#fff',
  }
});
