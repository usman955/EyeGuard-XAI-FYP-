import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../utils/theme';
import { Calendar, Activity } from 'lucide-react-native';

const scans = [
  { id: 'SCN-001', patientId: 'PAT-2024-001', patientName: 'James Wilson', type: 'Color Fundus', date: '2024-05-01', aiFlag: 'DR Detected', risk: 'High' },
  { id: 'SCN-002', patientId: 'PAT-2024-002', patientName: 'Maria Garcia', type: 'Color Fundus', date: '2024-04-28', aiFlag: 'Clear', risk: 'Normal' },
  { id: 'SCN-003', patientId: 'PAT-2024-003', patientName: 'Robert Chen', type: 'Red-free Fundus', date: '2024-04-25', aiFlag: 'Glaucoma suspected', risk: 'Moderate' },
  { id: 'SCN-004', patientId: 'PAT-2024-004', patientName: 'Sarah Miller', type: 'Color Fundus', date: '2024-04-20', aiFlag: 'AMD Detected', risk: 'Critical' },
];

const DoctorRetinalScans = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Retinal Scan Reports</Text>
          <Text style={styles.subtitle}>Centralized repository for all analyzed retinal imaging data.</Text>
        </View>

        <View style={styles.grid}>
          {scans.map((scan, i) => (
            <View key={i} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={require('../../../assets/images/retinal_scan.png')}
                  style={styles.image}
                />
                <View style={styles.riskBadge}>
                  <Text style={[
                    styles.riskText,
                    scan.risk === 'Critical' ? styles.textRed :
                      scan.risk === 'High' ? styles.textOrange : styles.textEmerald
                  ]}>
                    {scan.risk} RISK
                  </Text>
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.patientName} numberOfLines={1}>{scan.patientName}</Text>
                    <Text style={styles.patientId}>ID: {scan.patientId}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.typeLabel}>TYPE</Text>
                    <Text style={styles.typeValue}>{scan.type}</Text>
                  </View>
                </View>

                <View style={styles.infoBox}>
                  <View style={styles.infoRow}>
                    <Calendar color={theme.colors.textSecondary} size={14} />
                    <Text style={styles.infoText}>Scanned on {scan.date}</Text>
                  </View>
                  <View style={[styles.infoRow, { marginTop: 8 }]}>
                    <Activity color={theme.colors.primary} size={14} />
                    <Text style={styles.infoTextPrimary}>{scan.aiFlag}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => navigation.navigate('History')} // In a real app this goes to DoctorScanResult
                >
                  <Text style={styles.actionBtnText}>Open Detailed Report</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.m, paddingBottom: theme.spacing.xxxl },
  header: { marginBottom: theme.spacing.xl, marginTop: theme.spacing.m },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, marginTop: 8 },
  grid: { gap: theme.spacing.l },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  imageContainer: { height: 180, position: 'relative' },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  riskBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  riskText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  textRed: { color: '#f87171' },
  textOrange: { color: '#fb923c' },
  textEmerald: { color: '#34d399' },
  cardContent: { padding: theme.spacing.m, flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.m },
  patientName: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  patientId: { fontSize: 12, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 0.5 },
  typeLabel: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 2 },
  typeValue: { fontSize: 14, fontWeight: '600', color: theme.colors.text },
  infoBox: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.s,
    marginBottom: theme.spacing.l,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.5)',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '500' },
  infoTextPrimary: { fontSize: 12, color: theme.colors.primary, fontWeight: 'bold' },
  actionBtn: {
    backgroundColor: theme.colors.primaryLight,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 'auto',
  },
  actionBtnText: { color: theme.colors.primaryDark, fontWeight: 'bold', fontSize: 14 },
});

export default DoctorRetinalScans;
