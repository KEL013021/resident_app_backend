
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
} from 'react-native';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const isEmailInvalid = email.length > 0 && !gmailRegex.test(email);

  const handleSend = () => {
    if (isEmailInvalid) {
      setAlertMessage('Please enter a valid Gmail address.');
      setIsError(true);
      setModalVisible(true);
      return;
    }

    setAlertMessage(`Reset link sent to ${email}`);
    setIsError(false);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Forgot Your Password</Text>

      <View style={styles.iconWrapper}>
        <Image
          source={require('./assets/forgotpassword.png')}
          style={styles.iconImage}
        />
      </View>

      <Text style={styles.subtext}>
        Enter your registered email below to receive password reset instructions.
      </Text>

      <View style={{ width: '100%' }}>
        <TextInput
          style={[
            styles.input,
            isEmailInvalid && { borderColor: '#D9534F' }
          ]}
          placeholder="Enter your Gmail address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* Reserve space whether error is shown or not */}
        <View style={{ minHeight: 20, alignItems: 'flex-end', justifyContent: 'center' }}>
          {isEmailInvalid && (
            <Text style={styles.inlineErrorBelow}>✖ Invalid Gmail address</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backLogin}>Back to Login</Text>
      </TouchableOpacity>

      {/* Modal Alert */}
      <Modal transparent animationType="fade" visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={[styles.modalText, isError && { color: '#D9534F' }]}>
              {alertMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 25,
     marginTop: 35, // ← this adds space above the title
    color: '#333',
  },
  iconWrapper: {
    width: 150,
    height: 150,
    borderRadius: 60,
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  iconImage: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  subtext: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 42,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  inlineErrorBelow: {
    color: '#D9534F',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
    marginRight: 4,
  },
  sendButton: {
    backgroundColor: '#6D84B4',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLogin: {
    fontSize: 14,
    color: '#6A5ACD',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 8,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6D84B4',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
