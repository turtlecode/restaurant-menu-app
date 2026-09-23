import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './src/screens/HomeScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { Restaurant } from './src/types';
import { COLORS } from './src/theme/colors';

export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    // Set web page title
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      if (selectedRestaurant) {
        document.title = `${selectedRestaurant.name} - Menü | RestoranMenü`;
      } else {
        document.title = 'RestoranMenü - Şehrin En İyi Restoran ve Menü Rehberi';
      }
    }
  }, [selectedRestaurant]);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        {selectedRestaurant ? (
          <MenuScreen
            restaurant={selectedRestaurant}
            onBack={() => setSelectedRestaurant(null)}
          />
        ) : (
          <HomeScreen
            onSelectRestaurant={(restaurant) => setSelectedRestaurant(restaurant)}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  appContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
