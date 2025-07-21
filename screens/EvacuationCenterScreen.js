import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const evacuationCenters = [
  { id: '1', name: 'Barangay Hall - Burgos' },
  { id: '2', name: 'Tuy Municipal Gymnasium' },
  { id: '3', name: 'Magahis Elementary School' },
];

export default function EvacuationCenterScreen() {
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#E9F3FB',
      padding: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      color: isDark ? '#fff' : '#334',
    },
    card: {
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 2,
    },
    centerName: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#333',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Evacuation Centers</Text>
      <FlatList
        data={evacuationCenters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.centerName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}
