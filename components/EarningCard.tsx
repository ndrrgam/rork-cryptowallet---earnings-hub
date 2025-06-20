import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Zap, ChevronRight, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useEarningStore } from '@/store/earningStore';

export const EarningCard = () => {
  const { 
    isActive, 
    rate, 
    boosted, 
    totalEarned, 
    lastClaim,
    calculatePendingEarnings,
    claimEarnings
  } = useEarningStore();
  
  const [pendingAmount, setPendingAmount] = useState(calculatePendingEarnings());
  const [isClaiming, setIsClaiming] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingAmount(calculatePendingEarnings());
      
      // Calculate time since last claim
      const seconds = Math.floor((Date.now() - lastClaim) / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      
      if (hours > 0) {
        setTimeElapsed(`${hours}h ${minutes % 60}m`);
      } else {
        setTimeElapsed(`${minutes}m ${seconds % 60}s`);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastClaim, calculatePendingEarnings]);
  
  const handleClaim = async () => {
    if (pendingAmount <= 0 || isClaiming) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsClaiming(true);
    
    try {
      await claimEarnings();
    } finally {
      setIsClaiming(false);
    }
  };
  
  const getHourlyRate = () => {
    return (rate * boosted).toFixed(2);
  };
  
  return (
    <LinearGradient
      colors={[colors.gradientPrimary[0], colors.gradientPrimary[1]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Zap size={20} color="#FFF" />
          <Text style={styles.title}>DNS Earning</Text>
        </View>
        <View style={[styles.statusBadge, isActive ? styles.activeStatus : styles.inactiveStatus]}>
          <Text style={styles.statusText}>{isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Earned</Text>
          <Text style={styles.statValue}>{totalEarned} XYZ</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Earning Rate</Text>
          <Text style={styles.statValue}>{getHourlyRate()} XYZ/hr</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Boost</Text>
          <Text style={styles.statValue}>+{((boosted - 1) * 100).toFixed(0)}%</Text>
        </View>
      </View>
      
      <View style={styles.pendingContainer}>
        <View>
          <Text style={styles.pendingLabel}>Pending Rewards</Text>
          <View style={styles.timeRow}>
            <Clock size={12} color="#FFF" />
            <Text style={styles.timeText}>{timeElapsed}</Text>
          </View>
        </View>
        <Text style={styles.pendingAmount}>{pendingAmount.toFixed(2)} XYZ</Text>
      </View>
      
      <Pressable 
        style={[
          styles.claimButton,
          (pendingAmount <= 0 || isClaiming) && styles.disabledButton
        ]} 
        onPress={handleClaim}
        disabled={pendingAmount <= 0 || isClaiming}
      >
        {isClaiming ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <Text style={styles.claimButtonText}>
            {pendingAmount <= 0 ? 'Nothing to Claim' : 'Claim Rewards'}
          </Text>
        )}
      </Pressable>
      
      <Pressable style={styles.detailsButton}>
        <Text style={styles.detailsText}>Boost Your Earnings</Text>
        <ChevronRight size={16} color="#FFF" />
      </Pressable>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: 'rgba(0, 184, 148, 0.3)',
  },
  inactiveStatus: {
    backgroundColor: 'rgba(255, 118, 117, 0.3)',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  pendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  pendingLabel: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 4,
  },
  pendingAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
  },
  claimButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  claimButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 4,
  },
});