import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { X } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { BrowserControls } from '@/components/BrowserControls';
import { useBrowserStore } from '@/store/browserStore';

// Rest of the code remains the same...