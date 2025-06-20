import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { EarningCard } from '@/components/EarningCard';
import { MissionCard } from '@/components/MissionCard';
import { useMissionsStore } from '@/store/missionsStore';
import { useEarningStore } from '@/store/earningStore';

export default function EarnScreen() {
  const { dailyMissions, refreshMissions } = useMissionsStore();
  const { nftBoosters } = useEarningStore();
  
  // Refresh missions if needed
  React.useEffect(() => {
    refreshMissions();
  }, [refreshMissions]);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Earn XYZ',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <EarningCard />
        
        <Text style={styles.sectionTitle}>Daily Missions</Text>
        {dailyMissions.map(mission => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
        
        <Text style={styles.sectionTitle}>NFT Boosters</Text>
        <View style={styles.boostersContainer}>
          {nftBoosters.map(booster => (
            <View key={booster.id} style={styles.boosterCard}>
              <View style={[styles.boosterBadge, booster.isActive ? styles.activeBadge : styles.inactiveBadge]}>
                <Text style={styles.boosterBadgeText}>
                  {booster.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>
              
              <View style={styles.boosterImageContainer}>
                <View style={styles.boosterImage} />
              </View>
              
              <Text style={styles.boosterName}>{booster.name}</Text>
              <Text style={styles.boosterBoost}>+{(booster.boost * 100).toFixed(0)}% Boost</Text>
            </View>
          ))}
          
          <View style={[styles.boosterCard, styles.newBoosterCard]}>
            <Text style={styles.newBoosterText}>Get New Booster</Text>
            <Text style={styles.newBoosterPrice}>500 XYZ</Text>
          </View>
        </View>
        
        <View style={styles.stakingContainer}>
          <Text style={styles.sectionTitle}>Staking</Text>
          <Text style={styles.stakingDescription}>
            Stake your XYZ tokens to increase your earning rate and boost multiplier.
          </Text>
          
          <View style={styles.stakingCard}>
            <Text style={styles.stakingLabel}>Currently Staked</Text>
            <Text style={styles.stakingAmount}>{useEarningStore.getState().stakingAmount} XYZ</Text>
            <Text style={styles.stakingBoost}>
              +{((useEarningStore.getState().boosted - 1) * 100).toFixed(0)}% Boost
            </Text>
          </View>
        </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  boostersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
  },
  boosterCard: {
    width: '45%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    margin: 8,
    alignItems: 'center',
    position: 'relative',
  },
  boosterBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  activeBadge: {
    backgroundColor: `${colors.success}30`,
  },
  inactiveBadge: {
    backgroundColor: `${colors.textMuted}30`,
  },
  boosterBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.text,
  },
  boosterImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  boosterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: `${colors.primary}40`,
  },
  boosterName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  boosterBoost: {
    fontSize: 14,
    color: colors.success,
    textAlign: 'center',
  },
  newBoosterCard: {
    justifyContent: 'center',
    backgroundColor: `${colors.primary}20`,
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  newBoosterText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  newBoosterPrice: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
  },
  stakingContainer: {
    marginTop: 16,
  },
  stakingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginHorizontal: 16,
    marginBottom: 16,
    lineHeight: 20,
  },
  stakingCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  stakingLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  stakingAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  stakingBoost: {
    fontSize: 16,
    color: colors.success,
  },
});