import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { X, Copy, Share2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';

export default function ReceiveScreen() {
  const router = useRouter();
  const { address } = useWalletStore();
  const [copied, setCopied] = useState(false);
  
  const handleClose = () => {
    router.back();
  };
  
  const handleCopy = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, we would use Clipboard.setStringAsync(address)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // In a real app, we would use Share.share()
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Receive',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
          headerLeft: () => (
            <Pressable onPress={handleClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Receive Crypto</Text>
        <Text style={styles.subtitle}>
          Share your address to receive any supported cryptocurrency
        </Text>
        
        <View style={styles.qrContainer}>
          <View style={styles.qrCode} />
          <Text style={styles.scanText}>Scan to receive payment</Text>
        </View>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Your Wallet Address</Text>
          <Text style={styles.address}>{address}</Text>
          
          <View style={styles.actions}>
            <Pressable style={styles.actionButton} onPress={handleCopy}>
              <Copy size={20} color={colors.text} />
              <Text style={styles.actionText}>Copy</Text>
            </Pressable>
            
            <Pressable style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color={colors.text} />
              <Text style={styles.actionText}>Share</Text>
            </Pressable>
          </View>
          
          {copied && (
            <View style={styles.copiedBadge}>
              <Text style={styles.copiedText}>Address Copied!</Text>
            </View>
          )}
        </View>
        
        <View style={styles.warningContainer}>
          <Text style={styles.warningTitle}>Important</Text>
          <Text style={styles.warningText}>
            Only send compatible tokens to this address. Sending unsupported tokens may result in permanent loss.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginBottom: 16,
  },
  scanText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  addressContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    marginBottom: 24,
    position: 'relative',
  },
  addressLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionText: {
    color: colors.text,
    marginTop: 4,
    fontSize: 14,
  },
  copiedBadge: {
    position: 'absolute',
    top: -16,
    right: 16,
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  copiedText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  warningContainer: {
    backgroundColor: `${colors.warning}20`,
    borderRadius: 16,
    padding: 16,
    width: '100%',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.warning,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
});