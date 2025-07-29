import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';
import BASE_URL from './config';

export default function HomeScreen({ navigation }) {
  const { isDark } = useTheme();

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAnnouncements = () => {
    fetch(`${BASE_URL}/BRGY/RESIDENT_COPY1/database/get_announcements.php`)
      .then(response => response.text())
      .then(text => {
        console.log('⚠️ Raw response:', text);
        try {
          const data = JSON.parse(text);
          setAnnouncements(data);

          // Fetch dimensions for each image
          data.forEach(item => {
            if (item.image) {
              Image.getSize(
                item.image,
                (width, height) => {
                  const screenWidth = 340; // Adjust as needed
                  const ratio = height / width;
                  const calculatedHeight = screenWidth * ratio;
                  setImageDimensions(prev => ({
                    ...prev,
                    [item.id]: calculatedHeight,
                  }));
                },
                error => {
                  console.log('Failed to get image size:', error);
                }
              );
            }
          });
        } catch (error) {
          console.error('❌ JSON parse error:', error);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('❌ Network error:', error);
        setLoading(false);
      });
  };

  // Run once initially
  fetchAnnouncements();

  // Then repeat every 10 seconds
  const interval = setInterval(fetchAnnouncements, 10000);

  // Cleanup the interval on unmount
  return () => clearInterval(interval);
}, []);


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
      textAlign: 'right',
    },
    announcementImage: {
      width: '100%',
      height: 480,
      borderRadius: 8,
      marginTop: 10,
    },
    leftHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 10,
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
          <View style={styles.leftHeader}>
            <TouchableOpacity
              style={styles.sidebarIcon}
              onPress={() => navigation.openDrawer()}
            >
              <Ionicons name="menu" size={28} color="#fff" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Image
                source={require('./assets/logo1.png')}
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>
                <Text style={styles.bText}>BRGY</Text>
                <Text style={styles.gText}>GO</Text>
              </Text>
            </View>
          </View>

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

      {/* Welcome Message */}
      <View style={styles.welcomeBox}>
        <Text style={styles.welcomeText}>
          WELCOME!{"\n"}BrgyGo will help you today!
        </Text>
        <Image
          source={require('./assets/CHATBOT.png')}
          style={styles.sealImage}
        />
      </View>

      {/* Announcements */}
      <ScrollView style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#7A97C6" style={{ marginTop: 20 }} />
        ) : announcements.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: isDark ? '#fff' : '#000' }}>
            No announcements available.
          </Text>
        ) : (
          announcements.map(item => (
            <View key={item.id} style={styles.announcementContainer}>
              <Text style={styles.announcementHeader}>{item.title}</Text>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.announcementImage}
                  resizeMode="cover"
                />
              ) : null}
              <Text style={styles.announcementText}>{item.content}</Text>
              <Text style={styles.postedOnText}>
                Posted on: {new Date(item.date_posted).toLocaleString()}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
