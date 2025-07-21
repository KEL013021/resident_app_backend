import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

const ChangePasswordScreen = ({ navigation }) => {
  const { isDark, colors } = useTheme();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Hide bottom tab bar
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    }
    return () => {
      if (parent) {
        parent.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    };
  }, [navigation]);

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    Alert.alert('Success', 'Your password has been changed.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
       

        <Image
          source={require('./assets/password-lock.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: colors.text }]}>Create Your New Password</Text>
        <Text style={[styles.subtitle, { color: colors.label }]}>
          Create a new password that will be easy for you to remember.
        </Text>

        <View style={styles.form}>
          <Text style={[styles.label, { color: colors.text }]}>Current Password:</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#333' : '#fff',
                color: colors.text,
                borderColor: isDark ? '#555' : '#ccc',
              },
            ]}
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor={colors.label}
          />

          <Text style={[styles.label, { color: colors.text }]}>New Password:</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#333' : '#fff',
                color: colors.text,
                borderColor: isDark ? '#555' : '#ccc',
              },
            ]}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            placeholderTextColor={colors.label}
          />

          <Text style={[styles.label, { color: colors.text }]}>Confirm New Password:</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? '#333' : '#fff',
                color: colors.text,
                borderColor: isDark ? '#555' : '#ccc',
              },
            ]}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            placeholderTextColor={colors.label}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 0,         // itinaas ng konti ang content
    paddingBottom: 100,     // sapat para hindi matabunan ng keyboard
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  form: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#00C851',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
