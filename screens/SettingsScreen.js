import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { colors, isDark } = useTheme();

  // Set header background color and text color
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#6D84B4', // Kulay ng header
      },
      headerTintColor: '#fff', // Kulay ng arrow
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff', // Kulay ng "Settings"
      },
    });
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background, paddingBottom: 40 }, // dagdag na padding sa baba
        ]}
      >
        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Ionicons name="key-outline" size={20} color={colors.icon} style={styles.icon} />
          <Text style={[styles.itemText, { color: colors.text }]}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="person-outline" size={20} color={colors.icon} style={styles.icon} />
          <Text style={[styles.itemText, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.icon}
            style={styles.icon}
          />
          <Text style={[styles.itemText, { color: colors.text }]}>About</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexGrow: 1,
    paddingBottom: 40, // added padding to avoid buttons touching tab bar
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 24,
  },
});
