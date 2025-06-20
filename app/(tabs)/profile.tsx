import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView, Alert, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { ChevronRight, Copy, Share2, Shield, Bell, HelpCircle, LogOut } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';
import { useMissionsStore } from '@/store/missionsStore';

export default function ProfileScreen() {
  const { address } = useWalletStore();
  const { referral } = useMissionsStore();
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [referEmail, setReferEmail] = useState('');
  
  const handleToggleBiometric = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBiometricEnabled(!biometricEnabled);
  };
  
  const handleToggleNotifications = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setNotificationsEnabled(!notificationsEnabled);
  };
  
  const handleCopyReferralCode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, we would use Clipboard.setStringAsync(referral.code)
    Alert.alert('Copied!', `Referral code ${referral.code} copied to clipboard`);
  };
  
  const handleShareReferralCode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, we would use Share.share()
    Alert.alert('Share', `Sharing referral code ${referral.code}`);
  };
  
  const handleSendReferral = () => {
    if (!referEmail) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Success', `Invitation sent to ${referEmail}`);
    setReferEmail('');
  };
  
  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.walletLabel}>Wallet Address</Text>
            <Pressable style={styles.addressContainer} onPress={handleCopyReferralCode}>
              <Text style={styles.address}>{formatAddress(address)}</Text>
              <Copy size={16} color={colors.textSecondary} />
            </Pressable>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={colors.text} />
              <Text style={styles.settingText}>Biometric Authentication</Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleToggleBiometric}
              trackColor={{ false: colors.input, true: colors.primary }}
              thumbColor="#FFF"
            />
          </View>
          
          <Pressable style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={colors.text} />
              <Text style={styles.settingText}>Recovery Phrase</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.text} />
              <Text style={styles.settingText}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.input, true: colors.primary }}
              thumbColor="#FFF"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referrals</Text>
          
          <View style={styles.referralCard}>
            <View style={styles.referralHeader}>
              <Text style={styles.referralTitle}>Your Referral Code</Text>
              <View style={styles.referralActions}>
                <Pressable style={styles.referralAction} onPress={handleCopyReferralCode}>
                  <Copy size={16} color={colors.text} />
                </Pressable>
                <Pressable style={styles.referralAction} onPress={handleShareReferralCode}>
                  <Share2 size={16} color={colors.text} />
                </Pressable>
              </View>
            </View>
            
            <Text style={styles.referralCode}>{referral.code}</Text>
            
            <View style={styles.referralStats}>
              <View style={styles.referralStat}>
                <Text style={styles.referralStatValue}>{referral.totalReferred}</Text>
                <Text style={styles.referralStatLabel}>Friends Referred</Text>
              </View>
              <View style={styles.referralStat}>
                <Text style={styles.referralStatValue}>{referral.earned} XYZ</Text>
                <Text style={styles.referralStatLabel}>Tokens Earned</Text>
              </View>
            </View>
            
            <View style={styles.referralForm}>
              <TextInput
                style={styles.referralInput}
                placeholder="Friend's Email"
                placeholderTextColor={colors.textMuted}
                value={referEmail}
                onChangeText={setReferEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable style={styles.referralButton} onPress={handleSendReferral}>
                <Text style={styles.referralButtonText}>Send Invite</Text>
              </Pressable>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Pressable style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color={colors.text} />
              <Text style={styles.settingText}>Help Center</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          
          <Pressable style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <HelpCircle size={20} color={colors.text} />
              <Text style={styles.settingText}>Contact Support</Text>
            </View>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
        
        <Pressable style={styles.logoutButton}>
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
  },
  profileInfo: {
    flex: 1,
  },
  walletLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  address: {
    fontSize: 14,
    color: colors.text,
    marginRight: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  referralCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  referralHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  referralTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  referralActions: {
    flexDirection: 'row',
  },
  referralAction: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  referralCode: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  referralStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  referralStat: {
    flex: 1,
    alignItems: 'center',
  },
  referralStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  referralStatLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  referralForm: {
    marginTop: 8,
  },
  referralInput: {
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    marginBottom: 8,
  },
  referralButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  referralButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
});