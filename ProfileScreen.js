import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme, colors } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?\nYou will need to log in again to access your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Logged out', 'You have successfully logged out.');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <View style={[styles.avatarCircle, { backgroundColor: colors.iconBackground }]}>
          <FontAwesome name="user" size={60} color={colors.icon} />
        </View>
        <Text style={[styles.fullName, { color: colors.text }]}>FullName</Text>
      </View>

      {/* Options List */}
      <View style={styles.list}>
        {/* Email */}
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Email pressed')}>
          <View style={styles.rowLeft}>
            <MaterialIcons name="email" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          </View>
        </TouchableOpacity>

        {/* Dark Mode Toggle */}
        <View style={styles.item}>
          <View style={styles.rowLeft}>
            <Entypo name="moon" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
          </View>
          <View style={styles.switchWrapper}>
            <Switch
              trackColor={{ false: '#ccc', true: '#0A3E8C' }}
              thumbColor={isDark ? '#fff' : '#eee'}
              ios_backgroundColor="#3e3e3e"
              value={isDark}
              onValueChange={toggleTheme}
            />
          </View>
        </View>

        {/* Profile Details */}
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileDetails')}>
          <View style={styles.rowLeft}>
            <FontAwesome name="user-circle-o" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Profile Details</Text>
          </View>
        </TouchableOpacity>

        {/* Settings */}
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Settings')}>
          <View style={styles.rowLeft}>
            <Ionicons name="settings" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Settings</Text>
          </View>
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity style={styles.item} onPress={handleLogout}>
          <View style={styles.rowLeft}>
            <MaterialIcons name="logout" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70, 
    borderBottomColor: '#DCE3E8',
    borderBottomWidth: 1,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 15,
  },
  switchWrapper: {
    paddingRight: 4,
    paddingVertical: 0, 
  },
});
