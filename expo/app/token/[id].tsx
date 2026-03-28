import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowUpRight, ArrowDownRight, ChevronLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';
import { TransactionItem } from '@/components/TransactionItem';

export default function TokenDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { tokens, transactions } = useWalletStore();
  
  const token = tokens.find(t => t.id === id);
  const tokenTransactions = transactions.filter(t => t.token === id);
  
  const handleBack = () => {
    router.back();
  };
  
  const handleSend = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/send',
      params: { tokenId: id }
    });
  };
  
  const handleReceive = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/receive');
  };
  
  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Token not found</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: token.name,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
          headerLeft: () => (
            <Pressable onPress={handleBack} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.tokenHeader}>
          <Image
            source={{ uri: token.icon }}
            style={styles.tokenIcon}
            contentFit="cover"
            transition={200}
          />
          
          <View style={styles.tokenInfo}>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            <Text style={styles.tokenName}>{token.name}</Text>
          </View>
        </View>
        
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>{token.balance} {token.symbol}</Text>
          <Text style={styles.balanceValue}>${token.value.toLocaleString()}</Text>
          
          <View style={styles.changeContainer}>
            <Text style={[
              styles.changeText, 
              token.change24h >= 0 ? styles.positiveChange : styles.negativeChange
            ]}>
              {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}% (24h)
            </Text>
          </View>
        </View>
        
        <View style={styles.actions}>
          <Pressable style={styles.actionButton} onPress={handleSend}>
            <View style={[styles.actionIcon, styles.sendIcon]}>
              <ArrowUpRight size={20} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={handleReceive}>
            <View style={[styles.actionIcon, styles.receiveIcon]}>
              <ArrowDownRight size={20} color="#FFF" />
            </View>
            <Text style={styles.actionText}>Receive</Text>
          </Pressable>
        </View>
        
        <Text style={styles.sectionTitle}>Transaction History</Text>
        
        {tokenTransactions.length > 0 ? (
          tokenTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No transactions yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  tokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  tokenIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.input,
  },
  tokenInfo: {
    marginLeft: 16,
  },
  tokenSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  tokenName: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  balanceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  changeContainer: {
    backgroundColor: colors.input,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  positiveChange: {
    color: colors.success,
  },
  negativeChange: {
    color: colors.error,
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sendIcon: {
    backgroundColor: colors.primary,
  },
  receiveIcon: {
    backgroundColor: colors.secondary,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  emptyState: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
    marginTop: 24,
  },
});