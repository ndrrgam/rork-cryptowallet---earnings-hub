import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowUpRight, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';

export default function SendScreen() {
  const router = useRouter();
  const { tokenId } = useLocalSearchParams();
  const { tokens, sendToken, isLoading } = useWalletStore();
  
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const token = tokens.find(t => t.id === tokenId);
  
  useEffect(() => {
    if (!token) {
      Alert.alert('Error', 'Token not found');
      router.back();
    }
  }, [token, router]);
  
  const handleSend = async () => {
    if (!token) return;
    
    setError('');
    
    if (!recipient) {
      setError('Please enter a recipient address');
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (parseFloat(amount) > parseFloat(token.balance)) {
      setError('Insufficient balance');
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    const success = await sendToken(recipient, amount, token.id);
    
    if (success) {
      Alert.alert(
        'Transaction Sent',
        `You have sent ${amount} ${token.symbol} to ${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`,
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };
  
  const handleClose = () => {
    router.back();
  };
  
  const handleMaxAmount = () => {
    if (token) {
      setAmount(token.balance);
    }
  };
  
  if (!token) return null;
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: `Send ${token.symbol}`,
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
        <View style={styles.tokenInfo}>
          <Text style={styles.tokenLabel}>Token</Text>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            <Text style={styles.tokenBalance}>
              Balance: {token.balance} {token.symbol}
            </Text>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Recipient Address</Text>
          <TextInput
            style={styles.input}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="Enter wallet address"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Amount</Text>
          <View style={styles.amountContainer}>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              placeholderTextColor={colors.textMuted}
              keyboardType="numeric"
            />
            <Pressable style={styles.maxButton} onPress={handleMaxAmount}>
              <Text style={styles.maxButtonText}>MAX</Text>
            </Pressable>
          </View>
          <Text style={styles.amountValue}>
            ≈ ${amount ? (parseFloat(amount) * token.value / parseFloat(token.balance)).toFixed(2) : '0.00'}
          </Text>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Pressable 
          style={[styles.sendButton, isLoading && styles.disabledButton]} 
          onPress={handleSend}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <>
              <ArrowUpRight size={20} color="#FFF" style={styles.sendIcon} />
              <Text style={styles.sendButtonText}>Send {token.symbol}</Text>
            </>
          )}
        </Pressable>
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
  },
  tokenInfo: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  tokenLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenSymbol: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  tokenBalance: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  amountInput: {
    flex: 1,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
  },
  maxButton: {
    backgroundColor: `${colors.primary}30`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  maxButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  amountValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  errorText: {
    color: colors.error,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  sendIcon: {
    marginRight: 8,
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});