import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { DAppCard, DApp } from '@/components/DAppCard';
import { featuredDApps, popularDApps, categories, allDApps } from '@/mocks/dapps';

export default function ExplorerScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const handleDAppPress = (dapp: DApp) => {
    router.push({
      pathname: '/dapp',
      params: { url: dapp.url, name: dapp.name }
    });
  };
  
  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };
  
  const filteredDApps = selectedCategory === 'All' 
    ? allDApps 
    : allDApps.filter(dapp => dapp.category === selectedCategory);
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'DApp Explorer',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTitleStyle: {
            color: colors.text,
          },
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.searchBar}>
          <Search size={20} color={colors.textSecondary} />
          <Text style={styles.searchPlaceholder}>Search DApps</Text>
        </Pressable>
        
        <Text style={styles.sectionTitle}>Featured DApps</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          {featuredDApps.map(dapp => (
            <Pressable 
              key={dapp.id} 
              style={styles.featuredItem}
              onPress={() => handleDAppPress(dapp)}
            >
              <Image
                source={{ uri: dapp.banner }}
                style={styles.featuredBanner}
                contentFit="cover"
                transition={200}
              />
              <View style={styles.featuredContent}>
                <Image
                  source={{ uri: dapp.icon }}
                  style={styles.featuredIcon}
                  contentFit="cover"
                  transition={200}
                />
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{dapp.name}</Text>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryText}>{dapp.category}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <Pressable 
              key={category} 
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryText
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'Popular DApps' : `${selectedCategory} DApps`}
        </Text>
        {filteredDApps.map(dapp => (
          <DAppCard key={dapp.id} dapp={dapp} onPress={handleDAppPress} />
        ))}
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
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  searchPlaceholder: {
    color: colors.textSecondary,
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  featuredContainer: {
    paddingBottom: 16,
  },
  featuredItem: {
    width: 280,
    backgroundColor: colors.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
  },
  featuredBanner: {
    width: '100%',
    height: 140,
    backgroundColor: colors.input,
  },
  featuredContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  featuredIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.input,
  },
  featuredInfo: {
    marginLeft: 12,
    flex: 1,
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  categoriesContainer: {
    paddingBottom: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.card,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  categoryBadge: {
    backgroundColor: colors.input,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});