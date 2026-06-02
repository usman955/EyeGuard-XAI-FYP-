import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { theme } from '../../utils/theme';
import { Search, Filter, ChevronRight, Eye } from 'lucide-react-native';

const historyData = [
  { id: 'PAT-2026-001', name: 'James Wilson', date: '2026-05-01', diagnosis: 'Diabetic Retinopathy', severity: 'Moderate', status: 'Completed' },
  { id: 'PAT-2026-002', name: 'Maria Garcia', date: '2026-04-28', diagnosis: 'Normal', severity: 'None', status: 'Completed' },
  { id: 'PAT-2026-003', name: 'Robert Chen', date: '2026-04-25', diagnosis: 'Glaucoma suspected', severity: 'Mild', status: 'Follow-up' },
  { id: 'PAT-2026-004', name: 'Sarah Miller', date: '2026-04-20', diagnosis: 'AMD', severity: 'Severe', status: 'Emergency' },
  { id: 'PAT-2026-005', name: 'Michael Brown', date: '2026-04-18', diagnosis: 'Normal', severity: 'None', status: 'Completed' },
];

const DoctorHistoryScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = historyData.filter(record => 
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Clinical History</Text>
          <Text style={styles.subtitle}>Archived patient screening records and diagnostic reports.</Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Search color={theme.colors.textSecondary} size={20} />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search ID or Name"
              placeholderTextColor={theme.colors.textMuted}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Filter color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          {filteredData.map((record, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate('DoctorScanResult', { patientId: record.id })}
            >
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.patientId}>{record.id}</Text>
                  <Text style={styles.patientName}>{record.name}</Text>
                </View>
                <View style={styles.statusBox}>
                  <View style={[styles.statusDot, record.status === 'Emergency' ? styles.dotEmergency : styles.dotNormal]} />
                  <Text style={styles.statusText}>{record.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>DATE</Text>
                  <Text style={styles.infoValue}>{record.date}</Text>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>DIAGNOSIS</Text>
                  <Text style={styles.infoValue}>{record.diagnosis}</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <View style={[
                  styles.severityBadge, 
                  record.severity === 'Severe' ? styles.badgeSevere : 
                  record.severity === 'Moderate' ? styles.badgeModerate : styles.badgeNone
                ]}>
                  <Text style={[
                    styles.severityText,
                    record.severity === 'Severe' ? styles.textSevere : 
                    record.severity === 'Moderate' ? styles.textModerate : styles.textNone
                  ]}>{record.severity}</Text>
                </View>
                <TouchableOpacity style={styles.viewBtn} onPress={() => navigation.navigate('DoctorScanResult', { patientId: record.id })}>
                  <Eye color={theme.colors.primary} size={18} />
                  <Text style={styles.viewBtnText}>View Report</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          {filteredData.length === 0 && (
            <View style={{padding: 40, alignItems: 'center'}}>
              <Text style={{color: theme.colors.textSecondary, fontSize: 14}}>No matching records found.</Text>
            </View>
          )}
        </View>

        <View style={styles.pagination}>
          <TouchableOpacity style={[styles.pageBtn, styles.pageBtnDisabled]} disabled>
            <ChevronRight color={theme.colors.textMuted} size={20} style={{transform: [{rotate: '180deg'}]}} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pageBtn, styles.pageBtnActive]}>
            <Text style={styles.pageBtnTextActive}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <Text style={styles.pageBtnText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageBtn}>
            <ChevronRight color={theme.colors.textSecondary} size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.m, paddingBottom: theme.spacing.xxxl },
  header: { marginBottom: theme.spacing.l, marginTop: theme.spacing.m },
  title: { fontSize: 28, fontWeight: 'bold', color: theme.colors.text },
  subtitle: { fontSize: 16, color: theme.colors.textSecondary, marginTop: 8 },
  searchRow: { flexDirection: 'row', gap: 12, marginBottom: theme.spacing.l },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 14, color: theme.colors.text },
  filterBtn: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: { gap: theme.spacing.m },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.m,
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  patientId: { fontSize: 12, fontWeight: 'bold', color: theme.colors.primary, letterSpacing: 0.5 },
  patientName: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginTop: 2 },
  statusBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  dotEmergency: { backgroundColor: theme.colors.danger },
  dotNormal: { backgroundColor: theme.colors.primary },
  statusText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600' },
  cardBody: { flexDirection: 'row', gap: 24, marginBottom: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: theme.colors.border },
  infoCol: { flex: 1 },
  infoLabel: { fontSize: 10, fontWeight: 'bold', color: theme.colors.textSecondary, letterSpacing: 1, marginBottom: 4 },
  infoValue: { fontSize: 14, color: theme.colors.text, fontWeight: '500' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  severityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeSevere: { backgroundColor: theme.colors.dangerLight },
  badgeModerate: { backgroundColor: theme.colors.warningLight },
  badgeNone: { backgroundColor: 'rgba(241, 245, 249, 0.5)' },
  severityText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
  textSevere: { color: theme.colors.danger },
  textModerate: { color: theme.colors.warning },
  textNone: { color: theme.colors.textSecondary },
  viewBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  viewBtnText: { fontSize: 13, fontWeight: 'bold', color: theme.colors.primary },
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: theme.spacing.xl },
  pageBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, justifyContent: 'center', alignItems: 'center' },
  pageBtnActive: { backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.primary },
  pageBtnDisabled: { opacity: 0.5 },
  pageBtnText: { fontSize: 14, fontWeight: 'bold', color: theme.colors.textSecondary },
  pageBtnTextActive: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primaryDark },
});

export default DoctorHistoryScreen;
