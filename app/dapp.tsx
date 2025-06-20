import React, { useRef, useState } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { X } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { BrowserControls } from '@/components/BrowserControls';
import { useBrowserStore } from '@/store/browserStore';

export default function DAppScreen() {
  const router = useRouter();
  const { url, name } = useLocalSearchParams();
  const [currentUrl, setCurrentUrl] = useState(url as string);
  const [displayUrl, setDisplayUrl] = useState(url as string);
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef<WebView>(null);
  
  const { addToHistory, addVisitedDapp } = useBrowserStore();
  
  const handleClose = () => {
    router.back();
  };
  
  const handleUrlChange = (text: string) => {
    setDisplayUrl(text);
  };
  
  const handleUrlSubmit = () => {
    let formattedUrl = displayUrl;
    
    // Add https:// if not present
    if (formattedUrl && !formattedUrl.startsWith('http')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    
    if (formattedUrl) {
      setCurrentUrl(formattedUrl);
    }
  };
  
  const handleLoad = (event: any) => {
    const loadedUrl = event.nativeEvent.url;
    setDisplayUrl(loadedUrl);
    setIsLoading(false);
    
    // Add to history
    if (loadedUrl && loadedUrl !== 'about:blank') {
      addToHistory({
        url: loadedUrl,
        title: event.nativeEvent.title || loadedUrl,
        favicon: '',
        timestamp: Date.now(),
        isDapp: true
      });
      
      // Add to visited DApps
      addVisitedDapp(loadedUrl);
    }
  };
  
  const handleLoadStart = () => {
    setIsLoading(true);
  };
  
  const handleLoadEnd = () => {
    setIsLoading(false);
  };
  
  const handleNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
  };
  
  const handleGoBack = () => {
    webViewRef.current?.goBack();
  };
  
  const handleGoForward = () => {
    webViewRef.current?.goForward();
  };
  
  const handleRefresh = () => {
    webViewRef.current?.reload();
  };
  
  const handleHome = () => {
    setCurrentUrl(url as string);
  };
  
  const handleClear = () => {
    webViewRef.current?.stopLoading();
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: name as string || 'DApp',
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
      
      {Platform.OS !== 'web' ? (
        <>
          <View style={styles.webViewContainer}>
            <WebView
              ref={webViewRef}
              source={{ uri: currentUrl }}
              onLoad={handleLoad}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onNavigationStateChange={handleNavigationStateChange}
              style={styles.webView}
            />
          </View>
          
          <BrowserControls
            url={displayUrl}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
            isLoading={isLoading}
            onChangeUrl={handleUrlChange}
            onSubmitUrl={handleUrlSubmit}
            onGoBack={handleGoBack}
            onGoForward={handleGoForward}
            onRefresh={handleRefresh}
            onHome={handleHome}
            onClear={handleClear}
          />
        </>
      ) : (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            DApp browser is not available on web platform.
          </Text>
        </View>
      )}
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
  webViewContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  webView: {
    flex: 1,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});