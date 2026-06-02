import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../utils/theme';
import { Brain, ShieldCheck, Activity, Target, Zap, ArrowLeft } from 'lucide-react-native';

const AIInsightsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <ArrowLeft color={theme.colors.primary} size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconBox}>
            <Brain color={theme.colors.surface} size={32} />
          </View>
          <Text style={styles.title}>How Our AI Works</Text>
          <Text style={styles.subtitle}>Discover the science behind our retinal screening technology.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Precision Diagnostic Engine</Text>
          <View style={styles.featureCard}>
            <Activity color={theme.colors.primary} size={24} />
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Deep Learning Architecture</Text>
              <Text style={styles.featureDesc}>We use advanced convolutional neural networks trained on over 100,000 clinical retinal fundus images.</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <ShieldCheck color={theme.colors.primary} size={24} />
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Clinically Validated</Text>
              <Text style={styles.featureDesc}>Our algorithms achieve 98% sensitivity in detecting early-stage Diabetic Retinopathy and Glaucoma indicators.</Text>
            </View>
          </View>
        </View>

        <View style={styles.xaiCard}>
          <Text style={styles.xaiTitle}>Explainable AI (XAI)</Text>
          <Text style={styles.xaiText}>
            Unlike traditional "black box" AI, EyeGuard-XAI explains its decisions. It generates heatmaps that show exactly which parts of your retina the AI is looking at to make its diagnosis.
          </Text>
          <Image 
            source={require('../../../assets/images/gradcam_scan.png')} 
            style={styles.xaiImage}
          />
          <Text style={styles.imageCaption}>Sample Grad-CAM activation heatmap showing targeted areas.</Text>
        </View>

        <View style={styles.ctaCard}>
          <Zap color={theme.colors.surface} size={24} />
          <Text style={styles.ctaTitle}>Ready to start?</Text>
          <Text style={styles.ctaText}>Early detection is the best way to protect your vision. Take a screening today.</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => navigation.navigate('UserScreening')}>
            <Text style={styles.ctaBtnText}>Start Screening</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.xl },
  backBtn: { marginBottom: theme.spacing.m },
  header: { alignItems: 'center', marginBottom: theme.spacing.xl },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8 },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, textAlign: 'center' },
  section: { marginBottom: theme.spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 },
  featureCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  featureInfo: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  featureDesc: { fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 },
  xaiCard: {
    backgroundColor: theme.colors.primaryContainer,
    padding: 24,
    borderRadius: 32,
    marginBottom: theme.spacing.xl,
  },
  xaiTitle: { fontSize: 22, fontWeight: 'bold', color: theme.colors.surface, marginBottom: 12 },
  xaiText: { fontSize: 14, color: theme.colors.surface, lineHeight: 22, opacity: 0.9, marginBottom: 20 },
  xaiImage: { width: '100%', height: 200, borderRadius: 16, marginBottom: 12 },
  imageCaption: { fontSize: 11, color: theme.colors.surface, opacity: 0.7, textAlign: 'center', fontStyle: 'italic' },
  ctaCard: {
    backgroundColor: theme.colors.secondary,
    padding: 24,
    borderRadius: 32,
    alignItems: 'center',
  },
  ctaTitle: { fontSize: 20, fontWeight: 'bold', color: theme.colors.surface, marginTop: 12, marginBottom: 8 },
  ctaText: { fontSize: 14, color: theme.colors.surface, textAlign: 'center', opacity: 0.9, marginBottom: 20 },
  ctaBtn: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  ctaBtnText: { color: theme.colors.secondary, fontWeight: 'bold', fontSize: 16 },
});

export default AIInsightsScreen;
