import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

export default function HomeScreen({ navigation }) {
  const { isDark } = useTheme();

  const latestAnnouncement =
    '   Barangay Clean-Up Drive this Saturday at 7:00 AM. Please bring cleaning tools and wear protective gear.';
  const postedOn = 'Posted on: July 16, 2025 – 9:00 AM';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#E6F0F7',
    },
    header: {
      backgroundColor: isDark ? '#1F1F1F' : '#7A97C6',
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 15,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      elevation: 10,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sidebarIcon: {
      padding: 8,
    },
    userInfo: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    profileIcon: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 8,
    },
    welcomeBox: {
      backgroundColor: '#7A97C6',
      marginHorizontal: 20,
      marginTop: 15,
      borderRadius: 10,
      padding: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 10,
    },
    welcomeText: {
      color: '#fff',
      fontSize: 14,
      flex: 1,
    },
    sealImage: {
      width: 50,
      height: 50,
      marginLeft: 10,
    },
    announcementContainer: {
      backgroundColor: '#7A97C6',
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      padding: 15,
      elevation: 10,
    },
    announcementHeader: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    announcementText: {
      color: '#fff',
      fontSize: 14,
      textAlign: 'justify',
      lineHeight: 20,
      marginTop: 10,
      marginBottom: 10,
    },
    postedOnText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'right', // ➡️ Right aligned
    },
    leftHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // spacing between menu and logo
  },

  logoImage: {
    width: 50,
    height: 45,
    resizeMode: 'contain',
  },

  logoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  gText: {
  color: 'yellow',
},

bText: {
  color: '#fff',
},
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
  <View style={styles.headerRow}>
    {/* Menu + BRGYGO Branding (left side) */}
    <View style={styles.leftHeader}>
      <TouchableOpacity
        style={styles.sidebarIcon}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo1.png')} // replace with actual logo
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>
          <Text style={styles.bText}>BRGY</Text>
          <Text style={styles.gText}>GO</Text>
        </Text>
      </View>
    </View>

    {/* Profile Icon (right side) */}
    <View style={styles.userInfo}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person" size={20} color="rgba(102, 171, 241, 1)" />
      </TouchableOpacity>
    </View>
  </View>
</View>


      {/* Welcome Box */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>
          WELCOME!{"\n"}BrgyGo will help you today!
        </Text>
        <Image
          source={require('./assets/CHATBOT.png')}
          style={styles.sealImage}
        />
      </View>

      {/* Announcements Container */}
      <View style={styles.announcementContainer}>
        <Text style={styles.announcementHeader}>Barangay Announcement</Text>
        <Text style={styles.announcementText}>{latestAnnouncement}</Text>
        <Text style={styles.postedOnText}>{postedOn}</Text>
      </View>
    </SafeAreaView>
  );
}
