import React from 'react';
import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { ArrowLeft, ArrowRight, Home, Shield, RefreshCw, X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { colors } from '@/constants/colors';
import { useBrowserStore } from '@/store/browserStore';

interface BrowserControlsProps {
  url: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isLoading: boolean;
  onChangeUrl: (url: string) => void;
  onSubmitUrl: () => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onRefresh: () => void;
  onHome: () => void;
  onClear: () => void;
}

export const BrowserControls = ({
  url,
  canGoBack,
  canGoForward,
  isLoading,
  onChangeUrl,
  onSubmitUrl,
  onGoBack,
  onGoForward,
  onRefresh,
  onHome,
  onClear,
}: BrowserControlsProps) => {
  const { vpnEnabled, trackerBlocking } = useBrowserStore();
  
  const handleButtonPress = (callback: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    callback();
  };
  
  const getDisplayUrl = () => {
    try {
      if (!url || url === 'about:blank') return '';
      
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch (e) {
      return url;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.urlBar}>
        {(vpnEnabled || trackerBlocking) && (
          <View style={styles.securityBadge}>
            <Shield size={14} color={colors.success} />
          </View>
        )}
        
        <TextInput
          style={styles.urlInput}
          value={url}
          onChangeText={onChangeUrl}
          onSubmitEditing={onSubmitUrl}
          placeholder="Search or enter website"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="go"
          selectTextOnFocus
        />
        
        {url ? (
          <Pressable style={styles.clearButton} onPress={() => handleButtonPress(onClear)}>
            <X size={16} color={colors.textSecondary} />
          </Pressable>
        ) : null}
      </View>
      
      <View style={styles.controls}>
        <Pressable 
          style={[styles.controlButton, !canGoBack && styles.disabledButton]} 
          onPress={() => canGoBack && handleButtonPress(onGoBack)}
          disabled={!canGoBack}
        >
          <ArrowLeft size={20} color={canGoBack ? colors.text : colors.textMuted} />
        </Pressable>
        
        <Pressable 
          style={[styles.controlButton, !canGoForward && styles.disabledButton]} 
          onPress={() => canGoForward && handleButtonPress(onGoForward)}
          disabled={!canGoForward}
        >
          <ArrowRight size={20} color={canGoForward ? colors.text : colors.textMuted} />
        </Pressable>
        
        <Pressable 
          style={styles.controlButton} 
          onPress={() => handleButtonPress(isLoading ? onClear : onRefresh)}
        >
          <RefreshCw size={20} color={colors.text} />
        </Pressable>
        
        <Pressable 
          style={styles.controlButton} 
          onPress={() => handleButtonPress(onHome)}
        >
          <Home size={20} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  urlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
    marginBottom: 8,
  },
  securityBadge: {
    marginRight: 8,
  },
  urlInput: {
    flex: 1,
    height: 40,
    color: colors.text,
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
});