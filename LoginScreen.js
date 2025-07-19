import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import tab screens
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import DocumentsScreen from './DocumentsScreen';

// Tab Navigator Component
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// LoginScreen Component
export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    const validEmail = '';
    const validPassword = '';

    if (email === validEmail && password === validPassword) {
      setIsLoggedIn(true);
      setTimeout(() => {
        setIsLoggedIn(true);
      }, 100);
    } else {
      Alert.alert('Invalid Credentials', 'Invalid email or password.');
    }
  };

  return (
    <LinearGradient colors={['#607ECF', '#607ECF']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.logoWrapper}>
            <Image source={require('./assets/CHATBOT.png')} style={styles.logo} />
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>BrgyGO</Text>
            <Text style={styles.subtitle}>
              Start a better experience by logging into your account!
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your Password"
                secureTextEntry={secureText}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Ionicons
                  name={secureText ? 'eye-off-outline' : 'eye-outline'}
                  size={22}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

           <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>Forgot your Password?</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <Text style={styles.bottomText}>
              Don’t have an Account?{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                CREATE ACCOUNT
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// Export Tabs for use in App.js
export { Tabs as MainTabs };

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoWrapper: { marginBottom: -40, zIndex: 2 },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: '#000',
  },
  passwordWrapper: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },
  forgot: {
    alignSelf: 'flex-end',
    color: 'red',
    fontSize: 12,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#607ECF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: 13,
    color: '#000',
  },
  link: {
    color: '#355BCF',
    fontWeight: 'bold',
  },
});
