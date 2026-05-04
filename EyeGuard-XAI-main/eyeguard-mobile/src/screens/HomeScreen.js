/**
 * ============================================================================
 * File: HomeScreen.js
 * Location: screens
 * Purpose: Main user interface screen/view for the EyeGuard-XAI Mobile Application.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Bell, ChevronRight, Activity, Calendar } from 'lucide-react-native';

const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop' }} 
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <View style={[styles.statCard, { backgroundColor: '#fdfbf7' }]}>
          <View style={styles.statIconContainer}>
            <Activity color="#5D1F1A" size={24} />
          </View>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Pending Reviews</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#fdfbf7' }]}>
          <View style={styles.statIconContainer}>
            <Calendar color="#5D1F1A" size={24} />
          </View>
          <Text style={styles.statValue}>48</Text>
          <Text style={styles.statLabel}>Total Scans</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Patients</Text>
        {[1, 2, 3].map((item) => (
          <TouchableOpacity key={item} style={styles.patientItem}>
            <View style={styles.patientAvatarPlaceholder}>
              <Text style={styles.avatarText}>ID</Text>
            </View>
            <View style={styles.patientInfo}>
              <Text style={styles.patientId}>ID-9021{item}</Text>
              <Text style={styles.patientTime}>Reported {item}h ago</Text>
            </View>
            <View style={styles.riskBadge}>
              <Text style={styles.riskText}>HIGH RISK</Text>
            </View>
            <ChevronRight color="#cbd5e1" size={20} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 24,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'between',
    alignItems: 'center',
    marginBottom: 32,
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5D1F1A',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(93, 31, 26, 0.1)',
    shadowColor: '#5D1F1A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D1F1A',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginTop: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  patientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  patientAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fdfbf7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5D1F1A',
  },
  patientInfo: {
    flex: 1,
  },
  patientId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  patientTime: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  riskBadge: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  riskText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ef4444',
  },
  logoutBtn: {
    padding: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: 'bold',
  }
});

export default HomeScreen;
