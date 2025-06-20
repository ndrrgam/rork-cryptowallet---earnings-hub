import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { ExternalLink } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';

export interface DApp {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  icon: string;
  banner?: string;
  featured?: boolean;
}

interface DAppCardProps {
  dapp: DApp;
  onPress: (dapp: DApp) => void;
}

export const DAppCard = ({ dapp, onPress }: DAppCardProps) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(dapp);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      {dapp.featured && dapp.banner ? (
        <Image
          source={{ uri: dapp.banner }}
          style={styles.banner}
          contentFit="cover"
          transition={200}
        />
      ) : null}
      
      <View style={styles.content}>
        <Image
          source={{ uri: dapp.icon }}
          style={styles.icon}
          contentFit="cover"
          transition={200}
        />
        
        <View style={styles.info}>
          <Text style={styles.name}>{dapp.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {dapp.description}
          </Text>
          
          <View style={styles.footer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{dapp.category}</Text>
            </View>
            
            <ExternalLink size={16} color={colors.textSecondary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: 120,
    backgroundColor: colors.input,
  },
  content: {
    flexDirection: 'row',
    padding: 16,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.input,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    backgroundColor: colors.input,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});