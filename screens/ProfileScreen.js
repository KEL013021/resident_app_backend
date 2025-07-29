import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  MaterialIcons,
  Entypo,
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';
import { AuthContext } from '../App';
import BASE_URL from './config';

export default function ProfileScreen({ navigation }) {
  const { isDark, toggleTheme, colors } = useTheme();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [resident, setResident] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
          console.warn('No user_id found in storage.');
          return;
        }

        const response = await fetch(`${BASE_URL}/RESIDENT_COPY1/database/resident_get.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_id: userId }),
        });

        const result = await response.json();
        if (result.success && result.data) {
          setResident(result.data);
        } else {
          console.warn('Resident fetch failed:', result.message);
        }
      } catch (error) {
        console.error('Error fetching resident:', error);
      }
    };

    fetchData();
  }, []);

  const fullName = resident
    ? `${resident.first_name} ${resident.middle_name} ${resident.last_name}`
    : 'Loading...';

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?\nYou will need to log in again to access your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => setIsLoggedIn(false),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        {resident?.image_url ? (
        <Image
          source={{ uri: `${BASE_URL}/BRGY/BRGYGO/uploads/${resident.image_url}` }}
          style={styles.avatarCircle}
        />
        ) : (
          <View style={[styles.avatarCircle, { backgroundColor: colors.iconBackground }]}>
            <FontAwesome name="user" size={60} color={colors.icon} />
          </View>
        )}
        <Text style={[styles.fullName, { color: colors.text }]}>{fullName}</Text>
      </View>

      <View style={styles.list}>
        <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Email pressed')}>
          <View style={styles.rowLeft}>
            <MaterialIcons name="email" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          </View>
        </TouchableOpacity>

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

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ProfileDetails')}>
          <View style={styles.rowLeft}>
            <FontAwesome name="user-circle-o" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Profile Details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Settings')}>
          <View style={styles.rowLeft}>
            <Ionicons name="settings" size={20} color={colors.icon} style={styles.icon} />
            <Text style={[styles.label, { color: colors.text }]}>Settings</Text>
          </View>
        </TouchableOpacity>

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
  container: { flex: 1 },
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
    resizeMode: 'cover',
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
  },
});
