import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { theme } from '../../utils/theme';
import { UploadCloud, ShieldCheck, BrainCircuit, FileText } from 'lucide-react-native';

const UserScreeningScreen = ({ navigation }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      const timer = setTimeout(() => {
        if (isMounted) handleImageSelect();
      }, 600);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }, [])
  );

  const handleImageSelect = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You've refused to allow this app to access your photos!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setIsAnalyzing(true);
      
      // Simulate AI Analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        navigation.navigate('UserScanResult'); 
      }, 2500);
    }
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          navigation.navigate('UserScanResult');
        }, 2500);
      }
    } catch (err) {
      Alert.alert("Error", "Could not access file storage.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CLINICAL AI DIAGNOSTIC TOOL</Text>
          </View>
          <Text style={styles.title}>New Retinal Screening</Text>
          <Text style={styles.subtitle}>Upload a high-resolution fundus image to detect anomalies and generate an AI report.</Text>
        </View>

        <View style={styles.uploadCard}>
          {isAnalyzing ? (
            <View style={styles.analyzingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primary} style={{marginBottom: 16}} />
              <Text style={styles.analyzingTitle}>Analyzing Retinal Microstructure...</Text>
              <Text style={styles.analyzingText}>Detecting vessel abnormalities and lesion regions</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadArea} onPress={handleImageSelect}>
              <View style={styles.uploadIconCircle}>
                <UploadCloud color={theme.colors.primary} size={32} />
              </View>
              <Text style={styles.uploadTitle}>Tap to select image</Text>
              <Text style={styles.uploadSubtitle}>Supports JPG, PNG (Max 10MB)</Text>
              
              <TouchableOpacity style={styles.uploadBtn} onPress={handleFileSelect}>
                <Text style={styles.uploadBtnText}>Browse Files</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}

          <View style={styles.featuresRow}>
            <View style={styles.featureItem}>
              <ShieldCheck color={theme.colors.primary} size={16} />
              <Text style={styles.featureText}>VALIDATED ACCURACY</Text>
            </View>
            <View style={styles.featureItem}>
              <BrainCircuit color={theme.colors.primary} size={16} />
              <Text style={styles.featureText}>XAI INTERPRETABILITY</Text>
            </View>
            <View style={styles.featureItem}>
              <FileText color={theme.colors.primary} size={16} />
              <Text style={styles.featureText}>AUTOMATED REPORTING</Text>
            </View>
          </View>
        </View>

        <Text style={styles.notice}>
          NOTICE: This AI tool is designed to assist medical professionals. All findings should be clinically verified by a licensed ophthalmologist.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: theme.spacing.m, flex: 1, justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: theme.spacing.xl },
  badge: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: theme.colors.primaryDark, letterSpacing: 1 },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text, marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, textAlign: 'center', paddingHorizontal: 20 },
  uploadCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.95)',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  analyzingTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary, textAlign: 'center' },
  analyzingText: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 8, textAlign: 'center' },
  uploadArea: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.3)',
    marginBottom: theme.spacing.l,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  uploadSubtitle: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 20 },
  uploadBtn: {
    backgroundColor: theme.colors.text,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  uploadBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  featuresRow: { gap: 12 },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  featureText: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1 },
  notice: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
    paddingHorizontal: 20,
    lineHeight: 16,
    opacity: 0.6,
  },
});

export default UserScreeningScreen;
