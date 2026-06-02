import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { theme } from '../../utils/theme';
import { HeatmapOverlay } from '../../components/HeatmapOverlay';
import { AIPredictionCard } from '../../components/AIPredictionCard';
import { RiskBadge } from '../../components/RiskBadge';
import { GlassCard } from '../../components/GlassCard';
import { Download, AlertCircle, Info, Activity, ShieldAlert, Navigation } from 'lucide-react-native';

const AIAnalysisScreen = () => {
  // Mock Data
  const mockAnalysis = {
    patientId: 'PT-100234',
    overallRisk: 'High',
    predictions: [
      { disease: 'Diabetic Retinopathy', probability: 88, risk: 'High' },
      { disease: 'Glaucoma', probability: 32, risk: 'Low' },
      { disease: 'Age-Related Macular Degeneration', probability: 45, risk: 'Medium' },
      { disease: 'Hypertensive Retinopathy', probability: 12, risk: 'Low' }
    ],
    explanation: 'The AI model focused on abnormal vascular regions near the optic disc. High density of microaneurysms detected in the inferior temporal quadrant.'
  };

  const originalImg = require('../../../assets/images/retinal_scan.png');
  const heatmapImg = require('../../../assets/images/gradcam_scan.png'); // Mock heatmap

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.subtitle}>Patient ID: {mockAnalysis.patientId}</Text>
            <Text style={styles.title}>XAI Scan Results</Text>
          </View>
          <RiskBadge riskLevel={mockAnalysis.overallRisk} />
        </View>

        <Text style={styles.sectionLabel}>Visual Explanation (Grad-CAM)</Text>
        <HeatmapOverlay 
          originalSource={originalImg}
          heatmapSource={heatmapImg}
        />

        <GlassCard style={styles.explanationCard} intensity={80}>
          <View style={styles.explanationHeader}>
            <Info size={18} color={theme.colors.primary} />
            <Text style={styles.explanationTitle}>AI Insight</Text>
          </View>
          <Text style={styles.explanationText}>{mockAnalysis.explanation}</Text>
        </GlassCard>

        {/* New Detailed Clinical XAI Report */}
        <Text style={styles.sectionLabel}>Detailed Clinical XAI Report</Text>
        <View style={styles.clinicalReportCard}>
          <View style={styles.clinicalItem}>
            <Activity size={20} color={theme.colors.primary} />
            <View style={styles.clinicalItemTextContent}>
              <Text style={styles.clinicalItemTitle}>Identified Biomarkers</Text>
              <Text style={styles.clinicalItemDesc}>High concentration of microaneurysms and hard exudates detected in the macula region.</Text>
            </View>
          </View>
          
          <View style={styles.clinicalItem}>
            <ShieldAlert size={20} color={theme.colors.warning} />
            <View style={styles.clinicalItemTextContent}>
              <Text style={styles.clinicalItemTitle}>Grad-CAM Interpretation</Text>
              <Text style={styles.clinicalItemDesc}>The heatmap's red/orange areas highlight significant vascular leakage, highly indicative of Proliferative Diabetic Retinopathy.</Text>
            </View>
          </View>

          <View style={styles.clinicalItem}>
            <Navigation size={20} color={theme.colors.secondary} />
            <View style={styles.clinicalItemTextContent}>
              <Text style={styles.clinicalItemTitle}>Clinical Recommendations</Text>
              <Text style={styles.clinicalItemDesc}>Immediate referral for Optical Coherence Tomography (OCT) scan and consider Fluorescein Angiography to evaluate ischemia.</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Disease Probabilities</Text>
        {mockAnalysis.predictions.map((pred, index) => (
          <AIPredictionCard 
            key={index}
            disease={pred.disease}
            probability={pred.probability}
            risk={pred.risk}
          />
        ))}

        <GlassCard style={styles.confidenceCard}>
          <AlertCircle size={20} color={theme.colors.warning} />
          <Text style={styles.confidenceText}>
            AI Confidence Score: 94%. This result is an automated screening and should be clinically verified by an ophthalmologist.
          </Text>
        </GlassCard>

        <TouchableOpacity style={styles.downloadBtn}>
          <Download color="#fff" size={20} />
          <Text style={styles.downloadBtnText}>Download Full PDF Report</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.m,
    paddingBottom: theme.spacing.xxxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.xs,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.m,
  },
  explanationCard: {
    padding: theme.spacing.m,
    marginBottom: theme.spacing.l,
    backgroundColor: 'rgba(14, 165, 233, 0.05)',
    borderColor: theme.colors.primaryLight,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primaryDark,
    marginLeft: 6,
  },
  explanationText: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
  },
  confidenceCard: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    backgroundColor: theme.colors.warningLight,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.s,
    alignItems: 'flex-start',
  },
  confidenceText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
    color: '#92400e', // Darker warning color
    lineHeight: 18,
  },
  clinicalReportCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.l,
  },
  clinicalItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  clinicalItemTextContent: {
    flex: 1,
    marginLeft: 12,
  },
  clinicalItemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  clinicalItemDesc: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  downloadBtn: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.button,
  },
  downloadBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  }
});

export default AIAnalysisScreen;
