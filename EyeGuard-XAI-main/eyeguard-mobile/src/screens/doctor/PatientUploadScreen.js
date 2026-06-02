import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { theme } from '../../utils/theme';
import { Upload, FileUp, IdCard, ShieldCheck, Brain, FileText } from 'lucide-react-native';

const PatientUploadScreen = ({ navigation }) => {
  const [patientId, setPatientId] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      const timer = setTimeout(() => {
        if (isMounted) handleSimulateUpload();
      }, 600);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }, [])
  );

  const handleSimulateUpload = async () => {
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You've refused to allow this app to access your photos!");
      return;
    }

    // Open image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensures NO videos are selected
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      
      // 1. Check File Size (5MB = 5 * 1024 * 1024 bytes)
      // Note: asset.fileSize might be null depending on expo version, 
      // but usually available in modern versions.
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        Alert.alert("Error", "Image must be less than or equal to 5 MB.");
        return;
      }

      // 2. Simulated "Eye Detection" check
      // For demo purposes, we accept the image, but we can add a check here.

      setImageUri({ uri: asset.uri });
      setIsAnalyzing(true);
      
      // Simulate AI Analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        navigation.navigate('DoctorScanResult');
      }, 2500);
    }
  };

  const handleFileSelect = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Strictly images
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        // Check size
        if (asset.size && asset.size > 5 * 1024 * 1024) {
          Alert.alert("Error", "Image must be less than or equal to 5 MB.");
          return;
        }

        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          navigation.navigate('DoctorScanResult');
        }, 2500);
      }
    } catch (err) {
      Alert.alert("Error", "Could not access file storage.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>CLINICAL AI DIAGNOSTIC TOOL</Text>
          </View>
          <Text style={styles.headerTitle}>New Retinal Screening</Text>
          <Text style={styles.headerSubtitle}>
            Upload a high-resolution fundus image to detect anomalies and generate an AI report.
          </Text>
        </View>

        {/* Main Card */}
        <View style={styles.mainCard}>
          
          {/* Loading Overlay */}
          {isAnalyzing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={theme.colors.primaryContainer} style={styles.spinner} />
              <Text style={styles.loadingTitle}>Analyzing Retinal Microstructure...</Text>
              <Text style={styles.loadingSubtitle}>Detecting vessel abnormalities and lesion regions</Text>
            </View>
          )}

          <View style={styles.inputCard}>
            <Text style={styles.label}>PATIENT IDENTIFICATION</Text>
            <View style={styles.inputWrapper}>
              <IdCard color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. PAT-2026-001"
                placeholderTextColor={theme.colors.textMuted}
                value={patientId}
                onChangeText={setPatientId}
                editable={!isAnalyzing}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.uploadArea} 
            activeOpacity={0.8} 
            onPress={handleSimulateUpload}
            disabled={isAnalyzing}
          >
            {imageUri && !isAnalyzing ? (
              <View style={styles.previewContainer}>
                <Image source={imageUri} style={styles.previewImage} />
                <View style={styles.retakeOverlay}>
                  <Text style={styles.retakeText}>Tap to replace image</Text>
                </View>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <View style={styles.iconContainer}>
                  <FileUp color={theme.colors.surface} size={28} />
                </View>
                <Text style={styles.uploadTitle}>Drag & Drop Retinal Image</Text>
                <Text style={styles.uploadSubtitle}>or click to browse from clinical device</Text>
                <Text style={styles.uploadFormats}>JPG  •  PNG  •  DICOM COMPATIBLE</Text>
                <TouchableOpacity onPress={handleFileSelect}>
                  <Text style={styles.loadSampleText}>Browse clinical storage</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          
          {/* Footer Features */}
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <ShieldCheck color={theme.colors.primaryContainer} size={18} />
              <Text style={styles.featureText}>VALIDATED ACCURACY</Text>
            </View>
            <View style={styles.featureItem}>
              <Brain color={theme.colors.primaryContainer} size={18} />
              <Text style={styles.featureText}>XAI INTERPRETABILITY</Text>
            </View>
            <View style={styles.featureItem}>
              <FileText color={theme.colors.primaryContainer} size={18} />
              <Text style={styles.featureText}>AUTOMATED REPORTING</Text>
            </View>
          </View>

        </View>

        {/* Notice */}
        <Text style={styles.noticeText}>
          NOTICE: This AI tool is designed to assist medical professionals. All findings should be clinically verified by a licensed ophthalmologist.
        </Text>

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
    padding: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  badgeContainer: {
    backgroundColor: 'rgba(93, 31, 26, 0.1)', // primary-container/10
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: theme.colors.primaryContainer,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  mainCard: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    zIndex: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  spinner: {
    marginBottom: 16,
    transform: [{ scale: 1.5 }],
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.primaryContainer,
    textAlign: 'center',
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  inputCard: {
    marginBottom: theme.spacing.xl,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.m,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.m,
    fontSize: 16,
    color: theme.colors.text,
  },
  uploadArea: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.l,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, 
    overflow: 'hidden',
  },
  uploadContent: {
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  iconContainer: {
    backgroundColor: theme.colors.primaryContainer, // web uses maroon for icon
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.l,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  uploadFormats: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textMuted,
    letterSpacing: 1,
    marginBottom: 24,
  },
  loadSampleText: {
    fontSize: 14,
    color: theme.colors.primaryContainer,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  retakeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  retakeText: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  featuresGrid: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.s,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: theme.spacing.s,
    backgroundColor: 'rgba(246, 243, 242, 1)', // surface-container-low
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(217, 193, 190, 0.3)', // outline-variant/30
  },
  featureText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  noticeText: {
    marginTop: theme.spacing.xl,
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.textMuted,
    textAlign: 'center',
    maxWidth: 300,
  }
});

export default PatientUploadScreen;
