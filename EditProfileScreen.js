import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [education, setEducation] = useState('');
  const [household, setHousehold] = useState('');
  const [sitio, setSitio] = useState('');

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    navigation.setOptions({
      title: 'Edit Profile',
      headerStyle: { backgroundColor: '#6D84B4' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    });

    if (parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    }

    return () => {
      if (parent) {
        parent.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    };
  }, [navigation]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile saved successfully.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={100} color="#000" />
          )}
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Ionicons name="pencil" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Sex</Text>
              <TextInput style={styles.input} value={sex} onChangeText={setSex} />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} />
            </View>
          </View>

          <Text style={styles.label}>Educational Level</Text>
          <TextInput style={styles.input} value={education} onChangeText={setEducation} />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>House Hold Number</Text>
              <TextInput style={styles.input} value={household} onChangeText={setHousehold} />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Sitio</Text>
              <TextInput style={styles.input} value={sitio} onChangeText={setSitio} />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Saved Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f4f7fa',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 3,
  },
  formContainer: {
    backgroundColor: '#5d76b0ff',
    width: '90%',
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#6D84B4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#3aba63ff',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
