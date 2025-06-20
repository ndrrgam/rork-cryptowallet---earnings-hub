import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorValue } from 'react-native';
import { colors } from '@/constants/colors';
import { useEarningStore } from '@/store/earningStore';

export const EarningCard = () => {
  const { totalEarned, earningRate, boosted } = useEarningStore();
  
  const gradientColors: readonly [ColorValue, ColorValue] = [colors.gradientPrimary[0] as ColorValue, colors.gradientPrimary[1] as ColorValue];
  
  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Total Earned</Text>
        <Text style={styles.amount}>{totalEarned} $PVS</Text>
        
        <View style={styles.rateContainer}>
          <Text style={styles.rateLabel}>Earning Rate</Text>
          <Text style={styles.rateValue}>
            {earningRate} $PVS/day {boosted > 1 && `(${((boosted - 1) * 100).toFixed(0)}% Boost)`}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 16,
  },
  rateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  rateLabel: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.8,
    marginBottom: 4,
  },
  rateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});