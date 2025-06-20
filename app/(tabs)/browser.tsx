import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { colors } from '@/constants/colors';
import { BrowserControls } from '@/components/BrowserControls';
import { useBrowserStore } from '@/store/browserStore';

export default function BrowserScreen() {
  const [url, setUrl] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webViewRef = useRef<WebView>(null);
  
  const { addToHistory, addVisitedDapp } = useBrowserStore();
  
  const handleUrlChange = (text: string) => {
    setUrl(text);
  };
  
  const handleUrlSubmit = () => {
    let formattedUrl = url;
    
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
    setUrl(loadedUrl);
    setCurrentUrl(loadedUrl);
    setIsLoading(false);
    
    // Add to history
    if (loadedUrl && loadedUrl !== 'about:blank') {
      addToHistory({
        url: loadedUrl,
        title: event.nativeEvent.title || loadedUrl,
        favicon: '',
        timestamp: Date.now(),
        isDapp: loadedUrl.includes('uniswap') || 
                loadedUrl.includes('opensea') || 
                loadedUrl.includes('aave')
      });
      
      // Check if it's a DApp
      if (loadedUrl.includes('uniswap') || 
          loadedUrl.includes('opensea') || 
          loadedUrl.includes('aave')) {
        addVisitedDapp(loadedUrl);
      }
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
    setCurrentUrl('https://google.com');
  };
  
  const handleClear = () => {
    setUrl('');
    webViewRef.current?.stopLoading();
  };
  
  // Set initial URL
  useEffect(() => {
    setCurrentUrl('https://google.com');
  }, []);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Browser',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
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
            url={url}
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
            Browser is not available on web platform.
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