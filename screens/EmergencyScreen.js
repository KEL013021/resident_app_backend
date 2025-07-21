import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from './ThemeContext';

const emergencyContacts = [
  { id: '1', department: 'Police Station', number: '0915-899-1931 \n 0998-598-5711'},
  { id: '2', department: 'Bureau of Fire Protection', number: '0926-773-7914' },
  { id: '3', department: 'Rural Health Unit', number: '0926-911-1949' },
  { id: '4', department: 'Rescue Team', number: '0906-222-3333' },
  { id: '5', department: 'Municipal Social Welfare and Development Office', number: '0910-649-1566' },
];

export default function EmergencyScreen() {
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#7A97C6',
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 15,
      alignSelf: 'center',
    },
    card: {
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      borderRadius: 12,
      padding: 15,
      marginBottom: 10,
      elevation: 3,
    },
    department: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
    },
    number: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#555',
      marginTop: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tuy Emergency Hotlines</Text>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.department}>{item.department}</Text>
            <Text style={styles.number}>{item.number}</Text>
          </View>
        )}
      />
    </View>
  );
}
