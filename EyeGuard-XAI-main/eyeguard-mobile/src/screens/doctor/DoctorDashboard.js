import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { theme } from '../../utils/theme';
import { GlassCard } from '../../components/GlassCard';
import { useAuth } from '../../context/AuthContext';
import { Activity, Users, FileWarning, ArrowRight, Clock, Eye, AlertCircle, CheckCircle, LogOut, BrainCircuit } from 'lucide-react-native';

const DoctorDashboard = ({ navigation }) => {
  const { logout } = useAuth();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Dashboard</Text>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <LogOut color={theme.colors.primary} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.doctorName}>{user?.name || 'Medical Professional'}</Text>
          <Text style={styles.subtitle}>Here is your daily overview of patient screenings.</Text>
        </View>

        <View style={styles.bentoRow}>
          <TouchableOpacity 
            style={[styles.bentoCard, styles.pendingCard]} 
            onPress={() => navigation.navigate('History')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>PENDING REVIEWS</Text>
              <Clock color={theme.colors.primary} size={20} />
            </View>
            <View>
              <Text style={styles.cardValuePrimary}>12</Text>
              <Text style={styles.cardSubPrimary}>Requires attention today</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.bentoCard, styles.scansCard]} 
            onPress={() => navigation.navigate('UploadScan')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardLabel}>SCANS ANALYZED</Text>
              <Activity color={theme.colors.primary} size={20} />
            </View>
            <View>
              <Text style={styles.cardValuePrimary}>48</Text>
              <Text style={styles.cardSubPrimary}>+4 since yesterday</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.heroCard}
          onPress={() => navigation.navigate('UploadScan')}
          activeOpacity={0.9}
        >
          <ImageBackground 
            source={require('../../../assets/images/retinal_scan.png')} 
            style={styles.heroImage}
            imageStyle={{ borderRadius: theme.borderRadius.xl }}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroTitle}>Latest Screening Activity</Text>
              <Text style={styles.heroDesc}>AI flagged potential abnormalities in patient ID-7842. Review recommended.</Text>
              <View style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>View Scan Report</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* XAI HUB CARD */}
        <TouchableOpacity 
          style={[styles.bentoCard, { backgroundColor: theme.colors.primary, marginBottom: theme.spacing.l, minHeight: 140 }]} 
          onPress={() => navigation.navigate('DoctorAssistant')}
          activeOpacity={0.8}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardLabel, { color: '#fff' }]}>EXPLAINABLE AI HUB</Text>
            <BrainCircuit color="#fff" size={24} />
          </View>
          <View>
            <Text style={[styles.cardValuePrimary, { color: '#fff', fontSize: 24 }]}>XAI Studio</Text>
            <Text style={[styles.cardSubPrimary, { color: 'rgba(255,255,255,0.8)' }]}>Deep dive into AI decision mapping and clinical reasoning paths.</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text style={styles.sectionTitle}>Recent Patient Activity</Text>
          </View>
          
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('UploadScan')}>
            <View style={styles.listLeft}>
              <View style={[styles.avatar, styles.avatarDanger]}>
                <AlertCircle color={theme.colors.danger} size={20} />
              </View>
              <View>
                <Text style={styles.listId}>ID-9021</Text>
                <Text style={styles.listTime}>Reported 10m ago</Text>
              </View>
            </View>
            <View style={styles.badgeDanger}>
              <Text style={styles.badgeTextDanger}>HIGH RISK</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('UploadScan')}>
            <View style={styles.listLeft}>
              <View style={[styles.avatar, styles.avatarWarning]}>
                <Text style={styles.avatarTextWarning}>JD</Text>
              </View>
              <View>
                <Text style={styles.listId}>ID-7842</Text>
                <Text style={styles.listTime}>Reported 1h ago</Text>
              </View>
            </View>
            <View style={styles.badgeWarning}>
              <Text style={styles.badgeTextWarning}>PENDING</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate('History')}>
            <View style={styles.listLeft}>
              <View style={[styles.avatar, styles.avatarSuccess]}>
                <CheckCircle color={theme.colors.textMuted} size={20} />
              </View>
              <View>
                <Text style={styles.listId}>ID-5534</Text>
                <Text style={styles.listTime}>Reported 3h ago</Text>
              </View>
            </View>
            <View style={styles.badgeSuccess}>
              <Text style={styles.badgeTextSuccess}>NORMAL</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.s,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  greeting: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.s,
  },
  doctorName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: 8,
  },
  bentoRow: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },
  bentoCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'space-between',
    minHeight: 120,
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  cardValuePrimary: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  cardSubPrimary: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  heroCard: {
    height: 220,
    marginBottom: theme.spacing.l,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  heroImage: {
    flex: 1,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.l,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 16,
  },
  heroBtn: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  activitySection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  activityHeader: {
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  listLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarDanger: { backgroundColor: 'rgba(239, 68, 68, 0.15)' },
  avatarWarning: { backgroundColor: 'rgba(14, 165, 233, 0.1)' },
  avatarSuccess: { backgroundColor: theme.colors.background },
  avatarTextWarning: { color: theme.colors.primary, fontWeight: 'bold' },
  listId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  listTime: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  badgeDanger: {
    backgroundColor: theme.colors.dangerLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTextDanger: { color: theme.colors.danger, fontSize: 10, fontWeight: 'bold' },
  badgeWarning: {
    backgroundColor: theme.colors.border,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeTextWarning: { color: theme.colors.textSecondary, fontSize: 10, fontWeight: 'bold' },
  badgeSuccess: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeTextSuccess: { color: theme.colors.secondary, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
});

export default DoctorDashboard;
