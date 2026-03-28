import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { WebView } from 'react-native-webview';
import { colors } from '@/constants/colors';
import { BrowserControls } from '@/components/BrowserControls';
import { useBrowserStore } from '@/store/browserStore';

// Rest of the code remains the same...