import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { theme } from '../../utils/theme';
import { Download, Eye, Layers, Activity, BrainCircuit, Edit3, MessageSquare } from 'lucide-react-native';

const DoctorScanResult = ({ navigation }) => {
  const [heatmapOpacity, setHeatmapOpacity] = useState(0.7);
  const [observations, setObservations] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Advanced XAI Analysis</Text>
          <Text style={styles.subtitle}>ID: PAT-8842-A • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • Right Eye (OD)</Text>
          <TouchableOpacity style={styles.exportBtn}>
            <Download color={theme.colors.text} size={16} />
            <Text style={styles.exportBtnText}>Export Report</Text>
          </TouchableOpacity>
        </View>

        {/* Imaging Panel */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Eye color={theme.colors.primary} size={20} />
              <Text style={styles.cardTitle}>Retinal Imaging</Text>
            </View>
          </View>
          
          <View style={styles.cardBody}>
            <View style={styles.imageContainer}>
              <Image 
                source={require('../../../assets/images/retinal_scan.png')} 
                style={styles.baseImage} 
              />
              <Image 
                source={require('../../../assets/images/gradcam_scan.png')} 
                style={[styles.heatmapImage, { opacity: heatmapOpacity }]} 
              />
            </View>
            
            <View style={styles.opacityControls}>
              <Layers color={theme.colors.textSecondary} size={20} />
              <View style={styles.opacityBtns}>
                <TouchableOpacity onPress={() => setHeatmapOpacity(0)} style={[styles.opBtn, heatmapOpacity === 0 && styles.opBtnActive]}>
                  <Text style={[styles.opBtnText, heatmapOpacity === 0 && styles.opBtnTextActive]}>Original</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHeatmapOpacity(0.5)} style={[styles.opBtn, heatmapOpacity === 0.5 && styles.opBtnActive]}>
                  <Text style={[styles.opBtnText, heatmapOpacity === 0.5 && styles.opBtnTextActive]}>50% Mix</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setHeatmapOpacity(1)} style={[styles.opBtn, heatmapOpacity === 1 && styles.opBtnActive]}>
                  <Text style={[styles.opBtnText, heatmapOpacity === 1 && styles.opBtnTextActive]}>Heatmap</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Probability Scores */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Activity color={theme.colors.primary} size={20} />
              <Text style={styles.cardTitle}>Disease Probability</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.probItem}>
              <View style={styles.probHeader}>
                <Text style={styles.probName}>Diabetic Retinopathy</Text>
                <Text style={[styles.probValue, {color: theme.colors.danger}]}>87.4%</Text>
              </View>
              <View style={styles.probBarBg}>
                <View style={[styles.probBarFill, {width: '87.4%', backgroundColor: theme.colors.danger}]} />
              </View>
              <Text style={styles.probDesc}>Primary indicators detected in superior temporal quadrant.</Text>
            </View>

            <View style={styles.probItem}>
              <View style={styles.probHeader}>
                <Text style={styles.probName}>Glaucoma Suspect</Text>
                <Text style={[styles.probValue, {color: theme.colors.warning}]}>34.2%</Text>
              </View>
              <View style={styles.probBarBg}>
                <View style={[styles.probBarFill, {width: '34.2%', backgroundColor: theme.colors.warning}]} />
              </View>
            </View>

            <View style={styles.probItem}>
              <View style={styles.probHeader}>
                <Text style={styles.probName}>Macular Degeneration</Text>
                <Text style={[styles.probValue, {color: theme.colors.secondary}]}>12.8%</Text>
              </View>
              <View style={styles.probBarBg}>
                <View style={[styles.probBarFill, {width: '12.8%', backgroundColor: theme.colors.secondary}]} />
              </View>
            </View>
          </View>
        </View>

        {/* Clinical Interpretation */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <BrainCircuit color={theme.colors.primary} size={20} />
              <Text style={styles.cardTitle}>XAI Clinical Interpretation</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.interpBox}>
              <View style={styles.inferenceBox}>
                <Text style={styles.inferenceLabel}>Inference Path:</Text>
                <Text style={styles.inferencePath}>Input Image → Feature Extraction (ResNet-50) → Grad-CAM Activation Map → Localized Biomarker Detection → Diagnostic Classification</Text>
              </View>
              <Text style={styles.interpText}>
                The Grad-CAM activation heatmap indicates a high concentration of salient features in the superior temporal quadrant (weight: 0.85).{"\n\n"}
                The primary regions of interest correlate strongly with the morphological presence of microaneurysms and hard exudates. The CNN's final dense layer activations strongly favor Diabetic Retinopathy, localized primarily along the vascular arcades.
              </Text>
            </View>
            <TouchableOpacity style={styles.chatbotBtn} onPress={() => navigation.navigate('Assistant', { topic: 'clinical_review' })}>
              <MessageSquare color="#fff" size={18} />
              <Text style={styles.chatbotBtnText}>Discuss with XAI Assistant</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Clinical Notes */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Edit3 color={theme.colors.primary} size={20} />
              <Text style={styles.cardTitle}>Clinical Observations</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <TextInput
              style={styles.textArea}
              placeholder="Enter specific findings, refer to XAI heatmaps..."
              placeholderTextColor={theme.colors.textMuted}
              multiline
              textAlignVertical="top"
              value={observations}
              onChangeText={setObservations}
            />
            <View style={styles.noteActions}>
              <TouchableOpacity 
                style={styles.clearBtn}
                onPress={() => setObservations('')}
              >
                <Text style={styles.clearBtnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveBtn}
                onPress={() => {
                  if (!observations.trim()) {
                    alert('Empty Observations', 'Please enter clinical findings before finalizing.');
                    return;
                  }
                  alert('Success', 'Report signed and finalized successfully!');
                }}
              >
                <Text style={styles.saveBtnText}>Sign & Finalize</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.m, paddingBottom: theme.spacing.xxxl },
  header: { marginBottom: theme.spacing.xl, marginTop: theme.spacing.m },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  subtitle: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold', letterSpacing: 0.5, marginBottom: 12 },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  exportBtnText: { fontSize: 12, fontWeight: '600', color: theme.colors.text },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardHeader: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  cardBody: { padding: theme.spacing.m },
  imageContainer: {
    height: 250,
    borderRadius: theme.borderRadius.m,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    position: 'relative',
    marginBottom: theme.spacing.m,
  },
  baseImage: { width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute' },
  heatmapImage: { width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute' }, // Removed tintColor since we use the real gradcam image
  opacityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    padding: theme.spacing.s,
    borderRadius: theme.borderRadius.m,
  },
  opacityBtns: { flex: 1, flexDirection: 'row', justifyContent: 'space-between' },
  opBtn: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  opBtnActive: { backgroundColor: theme.colors.surface, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  opBtnText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600' },
  opBtnTextActive: { color: theme.colors.primary },
  probItem: { marginBottom: theme.spacing.m },
  probHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  probName: { fontSize: 14, fontWeight: 'bold', color: theme.colors.text },
  probValue: { fontSize: 14, fontWeight: 'bold' },
  probBarBg: { height: 8, backgroundColor: theme.colors.border, borderRadius: 4, overflow: 'hidden' },
  probBarFill: { height: '100%', borderRadius: 4 },
  probDesc: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 4 },
  interpBox: {
    backgroundColor: 'rgba(93, 31, 26, 0.03)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
  },
  inferenceBox: {
    backgroundColor: 'rgba(93, 31, 26, 0.08)',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
    marginBottom: 12,
  },
  inferenceLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  inferencePath: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  interpText: { fontSize: 13, color: theme.colors.text, lineHeight: 20 },
  chatbotBtn: {
    backgroundColor: theme.colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: theme.borderRadius.m,
  },
  chatbotBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  textArea: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    height: 120,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.m,
    fontSize: 14,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.m,
  },
  noteActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 12 },
  clearBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.primary },
  clearBtnText: { color: theme.colors.primary, fontWeight: 'bold', fontSize: 14 },
  saveBtn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, backgroundColor: theme.colors.primary },
  saveBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
});

export default DoctorScanResult;
