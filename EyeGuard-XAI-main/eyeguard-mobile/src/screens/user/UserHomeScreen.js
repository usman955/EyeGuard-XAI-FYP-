import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../utils/theme';
import { useAuth } from '../../context/AuthContext';
import { Scan, Eye, BrainCircuit, MessageCircle, ArrowRight, LogOut } from 'lucide-react-native';

const UserHomeScreen = ({ navigation }) => {
  const { logout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroHeader}>
            <Text style={styles.heroTitle}>Welcome Back</Text>
            <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
              <LogOut color={theme.colors.primary} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.heroSubtitle}>
            Understanding your vision has never been easier. Take a quick screening or explore our educational resources to learn more about keeping your eyes healthy.
          </Text>
          
          <TouchableOpacity 
            style={styles.heroBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('UserScreening')}
          >
            <Scan color={theme.colors.surface} size={20} />
            <Text style={styles.heroBtnText}>Start Screening</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image 
            source={require('../../../assets/images/retinal_scan.png')} 
            style={styles.heroImage}
          />
        </View>

        {/* Learn & Explore */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Learn & Explore</Text>
        </View>

        <View style={styles.cardsContainer}>
          
          <TouchableOpacity 
            style={styles.eduCard}
            onPress={() => navigation.navigate('Assistant', { topic: 'education' })}
          >
            <View style={styles.eduIconBox}>
              <Eye color={theme.colors.primary} size={24} />
            </View>
            <Text style={styles.eduCardTitle}>Common Symptoms</Text>
            <Text style={styles.eduCardDesc}>Learn about what to look out for, from blurry vision to dry eyes, and when to seek help.</Text>
            <View style={styles.eduAction}>
              <Text style={styles.eduActionText}>Read More</Text>
              <ArrowRight color={theme.colors.primary} size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.eduCard}
            onPress={() => navigation.navigate('AIInsights')}
          >
            <View style={styles.eduIconBox}>
              <BrainCircuit color={theme.colors.primary} size={24} />
            </View>
            <Text style={styles.eduCardTitle}>How AI Helps</Text>
            <Text style={styles.eduCardDesc}>Discover how our advanced algorithms work alongside doctors to detect issues early.</Text>
            <View style={styles.eduAction}>
              <Text style={styles.eduActionText}>Read More</Text>
              <ArrowRight color={theme.colors.primary} size={16} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.chatCard}
            onPress={() => navigation.navigate('Assistant', { topic: 'education' })}
          >
            <View style={styles.chatIconBox}>
              <MessageCircle color={theme.colors.primaryLight} size={24} />
            </View>
            <Text style={styles.chatCardTitle}>Symptom Checker</Text>
            <Text style={styles.chatCardDesc}>Have a quick question about your eye health? Chat with our AI assistant for immediate guidance.</Text>
            <View style={styles.chatBtn}>
              <Text style={styles.chatBtnText}>Start Chat</Text>
              <MessageCircle color={theme.colors.textSecondary} size={16} />
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
    backgroundColor: theme.colors.background 
  },
  scrollContent: { 
    padding: theme.spacing.xl, 
    paddingBottom: theme.spacing.xxxl 
  },
  heroSection: { 
    marginBottom: theme.spacing.l,
    marginTop: theme.spacing.s,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  heroSubtitle: { 
    fontSize: 16, 
    color: theme.colors.textSecondary, 
    lineHeight: 24,
    marginBottom: 24,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  heroBtnText: { 
    color: theme.colors.surface, 
    fontSize: 18, 
    fontWeight: '600' 
  },
  imageWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 180,
    marginBottom: theme.spacing.xl,
  },
  heroImage: { 
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover' 
  },
  sectionHeader: { 
    marginBottom: theme.spacing.l 
  },
  sectionTitle: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: theme.colors.text 
  },
  cardsContainer: { 
    gap: theme.spacing.l 
  },
  eduCard: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eduIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  eduCardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: theme.colors.text, 
    marginBottom: 12 
  },
  eduCardDesc: { 
    fontSize: 15, 
    color: theme.colors.textSecondary, 
    lineHeight: 22, 
    marginBottom: 24 
  },
  eduAction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 8, 
    marginTop: 'auto' 
  },
  eduActionText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: theme.colors.primary 
  },
  chatCard: {
    backgroundColor: theme.colors.primaryContainer,
    padding: theme.spacing.xl,
    borderRadius: 24,
    shadowColor: theme.colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  chatIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  chatCardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: theme.colors.primaryLight, 
    marginBottom: 12 
  },
  chatCardDesc: { 
    fontSize: 15, 
    color: theme.colors.primaryLight, 
    lineHeight: 22, 
    marginBottom: 24, 
    opacity: 0.9 
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.surface,
    paddingVertical: 14,
    borderRadius: 30,
  },
  chatBtnText: { 
    color: theme.colors.textSecondary, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default UserHomeScreen;
