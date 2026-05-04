/**
 * ============================================================================
 * File: ScreeningScreen.js
 * Location: screens
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Image as ImageIcon, CheckCircle, AlertTriangle } from 'lucide-react-native';

const ScreeningScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const pickImage = async (useCamera = false) => {
    let result;
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Camera access is required to take photos.');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        diagnosis: 'Diabetic Retinopathy Detected',
        confidence: 94.2,
        risk: 'High',
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <View style={styles.uploadSection}>
          <View style={styles.iconCircle}>
            <Camera color="#5D1F1A" size={40} />
          </View>
          <Text style={styles.uploadTitle}>Start Screening</Text>
          <Text style={styles.uploadSubtitle}>Capture or upload a high-resolution fundus image for AI analysis.</Text>
          
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => pickImage(true)}>
              <Camera color="#fff" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.primaryBtnText}>Take Photo</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => pickImage(false)}>
              <ImageIcon color="#5D1F1A" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.secondaryBtnText}>Choose Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sampleBtn} onPress={() => setImage(Image.resolveAssetSource(require('../../assets/retinal_scan.png')).uri)}>
              <Text style={styles.sampleBtnText}>Load Sample Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.previewSection}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          
          {isAnalyzing ? (
            <View style={styles.analysisOverlay}>
              <ActivityIndicator size="large" color="#5D1F1A" />
              <Text style={styles.analysisText}>Analyzing Retinal Patterns...</Text>
            </View>
          ) : result ? (
            <View style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <AlertTriangle color="#ef4444" size={24} />
                <Text style={styles.resultTitle}>{result.diagnosis}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.resultDetail}>
                <View>
                  <Text style={styles.detailLabel}>CONFIDENCE</Text>
                  <Text style={styles.detailValue}>{result.confidence}%</Text>
                </View>
                <View>
                  <Text style={styles.detailLabel}>RISK LEVEL</Text>
                  <Text style={[styles.detailValue, { color: '#ef4444' }]}>{result.risk}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.resetBtn} onPress={() => setImage(null)}>
                <Text style={styles.resetBtnText}>New Scan</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.analyzeBtn} onPress={handleAnalyze}>
              <Text style={styles.analyzeBtnText}>Run AI Diagnostic</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  uploadSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fdfbf7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(93, 31, 26, 0.1)',
  },
  uploadTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  primaryBtn: {
    backgroundColor: '#5D1F1A',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryBtnText: {
    color: '#5D1F1A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sampleBtn: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sampleBtnText: {
    color: '#64748b',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  previewSection: {
    flex: 1,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 350,
    borderRadius: 32,
    marginBottom: 24,
  },
  analyzeBtn: {
    backgroundColor: '#5D1F1A',
    width: '100%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  analyzeBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  analysisOverlay: {
    alignItems: 'center',
    gap: 12,
  },
  analysisText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5D1F1A',
  },
  resultCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 16,
  },
  resultDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#64748b',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  resetBtn: {
    alignItems: 'center',
  },
  resetBtnText: {
    color: '#5D1F1A',
    fontWeight: 'bold',
    fontSize: 14,
  }
});

export default ScreeningScreen;
