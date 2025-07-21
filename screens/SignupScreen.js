import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen({ navigation }) {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const handleConfirmPasswordChange = (text) => setConfirmPassword(text);

  const handleSignup = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    let valid = true;
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!trimmedEmail.endsWith('@gmail.com')) {
      setEmailError('Email must end with @gmail.com');
      valid = false;
    }

    if (trimmedPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch('http://192.168.1.9/Resident/database/signup.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gmail: trimmedEmail,
          password: trimmedPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.replace('Login') },
        ]);
      } else {
        Alert.alert('Error', data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Unable to connect to server');
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
              Start a better experience by signing up your account!
            </Text>

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={handleEmailChange}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {emailError ? <Text style={styles.warningText}>{emailError}</Text> : null}
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {passwordError ? <Text style={styles.warningText}>{passwordError}</Text> : null}
            </View>

            {/* Confirm Password Field */}
            <View style={styles.inputGroup}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
                </TouchableOpacity>
              </View>
              {confirmPasswordError ? (
                <Text style={styles.warningText}>{confirmPasswordError}</Text>
              ) : null}
            </View>

            {/* Signup Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            {/* Link to Login */}
            <Text style={styles.bottomText}>
              Already have an Account?{' '}
              <Text style={styles.link} onPress={() => navigation.replace('Login')}>
                LOG IN
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logoWrapper: {
    marginTop: 40,
    marginBottom: -40,
    zIndex: 2,
  },
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
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
    marginBottom: 30,
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
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  warningText: {
    width: '100%',
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    backgroundColor: '#607ECF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: 13,
    color: '#000',
    marginTop: 5,
  },
  link: {
    color: '#355BCF',
    fontWeight: 'bold',
  },
});
