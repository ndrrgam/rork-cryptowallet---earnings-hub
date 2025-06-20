import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useWalletStore } from '@/store/walletStore';
import { WalletHeader } from '@/components/WalletHeader';
import { TokenCard } from '@/components/TokenCard';
import { TransactionItem } from '@/components/TransactionItem';

export default function WalletScreen() {
  const { tokens, transactions, isLoading, refreshWallet } = useWalletStore();

  useFocusEffect(
    useCallback(() => {
      refreshWallet();
    }, [refreshWallet])
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <WalletHeader />
      
      <Text style={styles.sectionTitle}>Assets</Text>
      {tokens.map(token => (
        <TokenCard key={token.id} token={token} />
      ))}
      
      <Text style={styles.sectionTitle}>Recent Activity</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Wallet',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshWallet}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
});