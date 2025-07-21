import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import { useTheme } from './ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AboutScreen() {
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDark ? '#0D0D0D' : '#F2F7FA',
    },
    logoBackground: {
      height: 220,
      borderRadius: 20,
      overflow: 'hidden',
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    section: {
      marginBottom: 20,
      backgroundColor: isDark ? 'rgba(28,28,30,0.8)' : 'rgba(255,255,255,0.95)',
      borderRadius: 18,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: isDark ? '#3B82F6' : '#E0F2FE',
      backdropFilter: Platform.OS === 'web' ? 'blur(12px)' : undefined,
    },
    icon: {
      marginRight: 18,
      fontSize: 34,
      color: isDark ? '#60A5FA' : '#2563EB',
      textShadowColor: isDark ? '#3B82F6' : '#60A5FA',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 15,
      fontWeight: '700',
      color: isDark ? '#F9FAFB' : '#0F172A',
      marginBottom: 8,
      borderBottomWidth: 2,
      borderBottomColor: isDark ? '#3B82F6' : '#60A5FA',
      paddingBottom: 4,
    },
    paragraph: {
      fontSize: 15.5,
      color: isDark ? '#D1D5DB' : '#334155',
      lineHeight: 26,
      textAlign: 'justify',
      opacity: 0.95,
    },
    touchable: {
      borderRadius: 18,
      overflow: 'hidden',
    },
  });

  const handlePress = (title) => {
    alert(`You tapped on: ${title}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Logo with Background Image */}
      <ImageBackground
        source={require('./assets/BrgyHall.jpg')}
        style={styles.logoBackground}
        imageStyle={{ resizeMode: 'cover' }}
        blurRadius={Platform.OS === 'android' || Platform.OS === 'ios' ? 3 : 0}
      >
      </ImageBackground>

      {/* Sections */}
      {[
        {
          icon: 'information-circle-outline',
          title: 'About the Application',
          text:
            'This application empowers residents and officials with AI-assisted services: announcements, emergency contacts, a smart chatbot, and map navigation—all in one place.',
        },
        {
          icon: 'cloud-outline',
          title: 'API Integrations',
          text:
            'AI connects with APIs for real-time data such as chatbot responses.',
        },
        {
          icon: 'map-outline',
          title: 'Map Integration',
          text:
            'Our AI-enhanced map system helps locate evacuation centers during crises and events.',
        },
        {
          icon: 'chatbubble-ellipses-outline',
          title: 'Chatbot Assistant',
          text:
            'AI-powered 24/7 assistant provides real-time help with documents, emergency protocols, and local services—fast, reliable, and smart.',
        },
      ].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.touchable}
          activeOpacity={0.9}
          onPress={() => handlePress(item.title)}
        >
          <View style={styles.section}>
            <Ionicons name={item.icon} style={styles.icon} />
            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}