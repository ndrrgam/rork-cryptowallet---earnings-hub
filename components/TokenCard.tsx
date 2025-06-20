import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { Token } from '@/types/wallet';

interface TokenCardProps {
  token: Token;
}

export const TokenCard = ({ token }: TokenCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/token/${token.id}`);
  };

  const handleSend = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/send',
      params: { tokenId: token.id }
    });
  };

  const handleReceive = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/receive');
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.tokenInfo}>
        <Image
          source={{ uri: token.icon }}
          style={styles.tokenIcon}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.tokenDetails}>
          <Text style={styles.tokenSymbol}>{token.symbol}</Text>
          <Text style={styles.tokenName}>{token.name}</Text>
        </View>
      </View>
      
      <View style={styles.balanceInfo}>
        <View>
          <Text style={styles.tokenBalance}>{token.balance} {token.symbol}</Text>
          <Text style={styles.tokenValue}>${token.value.toLocaleString()}</Text>
        </View>
        
        <Text style={[
          styles.changeText, 
          token.change24h >= 0 ? styles.positiveChange : styles.negativeChange
        ]}>
          {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
        </Text>
      </View>
      
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={handleSend}>
          <ArrowUpRight size={18} color={colors.text} />
          <Text style={styles.actionText}>Send</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton} onPress={handleReceive}>
          <ArrowDownRight size={18} color={colors.text} />
          <Text style={styles.actionText}>Receive</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.input,
  },
  tokenDetails: {
    marginLeft: 12,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  tokenName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  tokenBalance: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  tokenValue: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  positiveChange: {
    color: colors.success,
    backgroundColor: `${colors.success}20`,
  },
  negativeChange: {
    color: colors.error,
    backgroundColor: `${colors.error}20`,
  },
  actions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  actionText: {
    color: colors.text,
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});