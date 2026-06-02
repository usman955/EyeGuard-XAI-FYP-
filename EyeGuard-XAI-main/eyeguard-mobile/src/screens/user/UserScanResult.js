import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../utils/theme';
import { ArrowLeft, Info, BrainCircuit, Eye, CheckCircle, AlertCircle, MapPin, ArrowRight, GraduationCap } from 'lucide-react-native';

const UserScanResult = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft color={theme.colors.primary} size={20} />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Your Scan Results</Text>
          <View style={{width: 40}} />
        </View>

        {/* Risk Indicator Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroTopBar} />
          <Text style={styles.heroOverline}>OVERALL STATUS</Text>
          
          <View style={[styles.badge, { backgroundColor: theme.colors.errorContainer }]}>
            <AlertCircle color={theme.colors.error} size={24} />
            <Text style={[styles.badgeText, { color: theme.colors.error }]}>Glaucoma & DR Detected</Text>
          </View>
          
          <Text style={styles.heroDesc}>
            Our AI has identified high-confidence biomarkers for <Text style={{fontWeight: 'bold', color: theme.colors.error}}>Glaucoma</Text> and <Text style={{fontWeight: 'bold', color: theme.colors.error}}>Diabetic Retinopathy</Text>. Immediate clinical intervention is advised.
          </Text>

          <View style={styles.aiExplanation}>
            <View style={styles.aiHeader}>
              <BrainCircuit color={theme.colors.primary} size={20} />
              <Text style={styles.aiTitle}>How the AI Made Its Decision</Text>
            </View>
            <Text style={styles.aiText}>
              The AI looked closely at your eye scan. It detected patterns that are consistent with <Text style={{fontWeight: 'bold', color: theme.colors.primaryDark}}>Diabetic Retinopathy</Text>. This condition occurs when high blood sugar levels cause damage to blood vessels in the retina. These blood vessels can swell and leak, which is what the AI noticed. We strongly recommend having a human eye doctor review this scan to confirm and discuss next steps.
            </Text>
          </View>
        </View>

        {/* Understanding Your Result */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Info color={theme.colors.primaryDark} size={24} />
            <Text style={styles.cardTitle}>Understanding Your Result</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.understandingText}>
              <Text style={{fontWeight: 'bold'}}>What is Diabetic Retinopathy?</Text>{'\n'}
              It is a complication of diabetes that affects the eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).{'\n\n'}
              <Text style={{fontWeight: 'bold'}}>Why did the AI flag this?</Text>{'\n'}
              The AI found tiny spots that indicate small leaks in your blood vessels. Finding this early is very good, as treatment can prevent vision loss.
            </Text>
          </View>
        </View>

        {/* What We Found */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Eye color={theme.colors.primaryDark} size={24} />
            <Text style={styles.cardTitle}>What We Found</Text>
          </View>
          <View style={styles.cardBody}>
            <Image 
              source={require('../../../assets/images/retinal_scan.png')} 
              style={styles.scanImage} 
            />
            <View style={styles.listItem}>
              <CheckCircle color={theme.colors.primary} size={20} style={{marginTop: 2}} />
              <Text style={styles.listText}>The main structure of your retina appears healthy and clear.</Text>
            </View>
            <View style={styles.listItem}>
              <AlertCircle color={theme.colors.warning} size={20} style={{marginTop: 2}} />
              <Text style={styles.listText}>Signs of tiny blood vessel leaks were detected. This is a common early sign of Diabetic Retinopathy but requires a doctor's confirmation.</Text>
            </View>
          </View>
        </View>

        {/* Next Steps */}
        <View style={[styles.card, styles.stepsCard]}>
          <View style={styles.cardHeader}>
            <MapPin color={theme.colors.secondary} size={24} />
            <Text style={[styles.cardTitle, {color: theme.colors.secondary}]}>Recommended Next Steps</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumBox}>
                <Text style={styles.stepNum}>1</Text>
              </View>
              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Schedule a Routine Checkup:</Text> We recommend sharing these results with an Eye Doctor within the next few weeks.
              </Text>
            </View>

            <View style={styles.stepItem}>
              <View style={styles.stepNumBox}>
                <Text style={styles.stepNum}>2</Text>
              </View>
              <Text style={styles.stepText}>
                <Text style={{fontWeight: 'bold'}}>Monitor Your Vision:</Text> If you notice any sudden changes in your eyesight, please seek care immediately.
              </Text>
            </View>

            <TouchableOpacity style={styles.consultBtn}>
              <Text style={styles.consultBtnText}>Consult an Ophthalmologist</Text>
              <ArrowRight color="#fff" size={18} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footerNote}>
          <GraduationCap color={theme.colors.textMuted} size={32} style={{marginBottom: 8}} />
          <Text style={styles.footerText}>
            Remember, EyeGuard-XAI is an assistant designed to help you stay informed. It does not replace a professional medical diagnosis. Always trust your doctor's advice.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: theme.spacing.m, paddingBottom: theme.spacing.xxxl },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.xl, marginTop: theme.spacing.s },
  backBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(241, 245, 249, 0.8)', padding: 8, borderRadius: 20 },
  backBtnText: { color: theme.colors.primary, fontWeight: 'bold', marginLeft: 4 },
  title: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primaryDark },
  heroCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
  heroTopBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: theme.colors.primary,
  },
  heroOverline: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    letterSpacing: 2,
    marginTop: 8,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef08a', // Yellowish similar to secondary-container
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 16,
  },
  badgeText: { fontSize: 20, fontWeight: 'bold', color: theme.colors.text, marginLeft: 8 },
  heroDesc: {
    fontSize: 16,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  aiExplanation: {
    backgroundColor: 'rgba(93, 31, 26, 0.03)',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: '100%',
  },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  aiTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.primary },
  aiText: { fontSize: 14, color: theme.colors.textSecondary, lineHeight: 22 },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.l,
    overflow: 'hidden',
    shadowColor: theme.colors.textMuted,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepsCard: {
    backgroundColor: '#fafaf9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.primaryDark },
  cardBody: { padding: theme.spacing.m },
  scanImage: {
    width: '100%',
    height: 180,
    borderRadius: theme.borderRadius.m,
    marginBottom: 16,
  },
  understandingText: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  listItem: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  listText: { flex: 1, fontSize: 14, color: theme.colors.textSecondary, lineHeight: 20 },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepNumBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNum: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  stepText: { flex: 1, fontSize: 14, color: theme.colors.text, lineHeight: 22 },
  consultBtn: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 16,
    gap: 8,
  },
  consultBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  footerNote: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
    alignItems: 'center',
    marginTop: theme.spacing.m,
  },
  footerText: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default UserScanResult;
