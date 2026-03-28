import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Copy, RefreshCw, QrCode } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';

export const WalletHeader = () => {
  const router = useRouter();
  const { address, totalBalance, isLoading, refreshWallet } = useWalletStore();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In a real app, we would use Clipboard.setStringAsync(address)
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await refreshWallet();
  };

  const handleShowQR = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/receive');
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceAmount}>${totalBalance.toLocaleString()}</Text>
          {isLoading ? (
            <ActivityIndicator color={colors.primary} style={styles.refreshIcon} />
          ) : (
            <Pressable onPress={handleRefresh} style={styles.refreshButton}>
              <RefreshCw size={18} color={colors.textSecondary} />
            </Pressable>
          )}
        </View>
      </View>
      
      <View style={styles.addressContainer}>
        <Pressable 
          style={styles.addressButton} 
          onPress={handleCopyAddress}
        >
          <Text style={styles.addressText}>{formatAddress(address)}</Text>
          <Copy size={16} color={colors.textSecondary} />
        </Pressable>
        
        {copied && (
          <View style={styles.copiedBadge}>
            <Text style={styles.copiedText}>Copied!</Text>
          </View>
        )}
        
        <Pressable style={styles.qrButton} onPress={handleShowQR}>
          <QrCode size={20} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  refreshIcon: {
    marginLeft: 8,
  },
  refreshButton: {
    marginLeft: 8,
    padding: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
  },
  addressText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginRight: 8,
  },
  copiedBadge: {
    position: 'absolute',
    bottom: -24,
    left: 16,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  copiedText: {
    color: '#FFF',
    fontSize: 12,
  },
  qrButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});