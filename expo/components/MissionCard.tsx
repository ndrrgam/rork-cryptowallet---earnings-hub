import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { CheckCircle, Clock } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { Mission } from '@/types/wallet';
import { useMissionsStore } from '@/store/missionsStore';

interface MissionCardProps {
  mission: Mission;
}

export const MissionCard = ({ mission }: MissionCardProps) => {
  const { completeMission, claimMissionReward } = useMissionsStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAction = async () => {
    if (isLoading) return;
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoading(true);
    
    try {
      if (mission.completed) {
        await claimMissionReward(mission.id);
      } else {
        // In a real app, this would check if the mission is actually completed
        await completeMission(mission.id);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const getTimeRemaining = () => {
    const now = Date.now();
    const remaining = mission.expires - now;
    
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m remaining`;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{mission.title}</Text>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>{mission.reward} PVS</Text>
          </View>
        </View>
        
        <Text style={styles.description}>{mission.description}</Text>
        
        <View style={styles.footer}>
          <View style={styles.timeContainer}>
            <Clock size={14} color={colors.textSecondary} />
            <Text style={styles.timeText}>{getTimeRemaining()}</Text>
          </View>
          
          <Pressable 
            style={[
              styles.actionButton,
              mission.completed ? styles.claimButton : styles.completeButton
            ]}
            onPress={handleAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <>
                {mission.completed && <CheckCircle size={16} color="#FFF" style={styles.buttonIcon} />}
                <Text style={styles.buttonText}>
                  {mission.completed ? 'Claim Reward' : 'Complete'}
                </Text>
              </>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  rewardBadge: {
    backgroundColor: `${colors.primary}30`,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rewardText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeButton: {
    backgroundColor: colors.secondary,
  },
  claimButton: {
    backgroundColor: colors.primary,
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});