import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ArrowUpRight, ArrowDownRight, Clock, Coins, LockKeyhole, Unlock } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Transaction } from '@/types/wallet';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: (transaction: Transaction) => void;
}

export const TransactionItem = ({ transaction, onPress }: TransactionItemProps) => {
  const getIcon = () => {
    switch (transaction.type) {
      case 'send':
        return <ArrowUpRight size={20} color={colors.error} />;
      case 'receive':
        return <ArrowDownRight size={20} color={colors.success} />;
      case 'earn':
        return <Coins size={20} color={colors.primary} />;
      case 'stake':
        return <LockKeyhole size={20} color={colors.secondary} />;
      case 'unstake':
        return <Unlock size={20} color={colors.warning} />;
      default:
        return <Clock size={20} color={colors.textSecondary} />;
    }
  };

  const getTitle = () => {
    switch (transaction.type) {
      case 'send':
        return 'Sent';
      case 'receive':
        return 'Received';
      case 'earn':
        return 'Earned';
      case 'stake':
        return 'Staked';
      case 'unstake':
        return 'Unstaked';
      default:
        return 'Transaction';
    }
  };

  const getSubtitle = () => {
    if (transaction.address) {
      return `${transaction.address.substring(0, 6)}...${transaction.address.substring(transaction.address.length - 4)}`;
    }
    
    switch (transaction.type) {
      case 'earn':
        return 'DNS Earning';
      case 'stake':
        return 'Staking Rewards';
      case 'unstake':
        return 'Unstaking';
      default:
        return new Date(transaction.timestamp).toLocaleString();
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress(transaction);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.details}>
        <Text style={styles.title}>{getTitle()}</Text>
        <Text style={styles.subtitle}>{getSubtitle()}</Text>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount,
          transaction.type === 'send' ? styles.negative : 
          (transaction.type === 'receive' || transaction.type === 'earn' || transaction.type === 'unstake') ? styles.positive : 
          styles.neutral
        ]}>
          {transaction.type === 'send' ? '-' : 
           (transaction.type === 'receive' || transaction.type === 'earn' || transaction.type === 'unstake') ? '+' : ''}
          {transaction.amount} {transaction.token}
        </Text>
        <Text style={styles.timestamp}>{formatDate(transaction.timestamp)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  positive: {
    color: colors.success,
  },
  negative: {
    color: colors.error,
  },
  neutral: {
    color: colors.text,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textMuted,
  },
});