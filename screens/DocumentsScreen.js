import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, StyleSheet, ScrollView, FlatList, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from './Chatscreen';
import { useTheme } from './ThemeContext';

export default function DocumentsScreen() {
  const { isDark } = useTheme();

  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [address, setAddress] = useState('');
  const [purpose, setPurpose] = useState('');
  const [requests, setRequests] = useState([]);

  const handleSubmit = () => {
    if (!address || !purpose || !documentType) {
      alert('Please complete all fields.');
      return;
    }

    setRequests(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: documentType,
        status: 'Pending',
        
      },
    ]);

    setDocumentType('');
    setAddress('');
    setPurpose('');
    setShowForm(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#7A97C6',
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    logoTitleWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 30,
      height: 30,
      marginRight: 8,
    },
    headerTitle: {
      color: isDark ? '#fff' : '#000',
      fontSize: 22,
      fontWeight: 'bold',
    },
    card: {
      backgroundColor: isDark ? '#1E1E1E' : '#5C7DB1',
      padding: 16,
      borderRadius: 10,
      marginBottom: 15,
      alignItems: 'center',
    },
    cardTitle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    requestBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#407BFF',
      padding: 14,
      borderRadius: 10,
      justifyContent: 'center',
    },
    requestBtnText: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 10,
      fontWeight: 'bold',
    },
    backBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    backText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 5,
      fontSize: 16,
    },
    label: {
      color: '#fff',
      marginBottom: 5,
      fontWeight: 'bold',
    },
    pickerWrapper: {
      backgroundColor: isDark ? '#333' : '#fff',
      borderRadius: 8,
      marginBottom: 15,
    },
    picker: {
      height: 50,
      color: isDark ? '#fff' : '#000',
    },
    input: {
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#000',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      marginBottom: 15,
    },
    form: {
      marginBottom: 10,
    },
    formContent: {
      paddingBottom: 100,
    },
    buttonContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    submitBtn: {
      flexDirection: 'row',
      backgroundColor: '#30C45D',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    submitText: {
      color: '#fff',
      fontWeight: 'bold',
      marginLeft: 8,
      fontSize: 16,
    },
    subHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginVertical: 10,
    },
    table: {
      paddingBottom: 100,
    },
    tableRow: {
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      padding: 12,
      borderRadius: 8,
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    rowItem: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
    },
    emptyText: {
      color: '#fff',
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 20,
    },
    floatingButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: '#407BFF',
      padding: 12,
      borderRadius: 30,
      elevation: 5,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'flex-end',
    },
    chatBox: {
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      height: '70%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
    chatHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#407BFF',
      padding: 15,
    },
    chatTitle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.logoTitleWrapper}>
          <Image source={require('./assets/CHATBOT.png')} style={styles.logo} resizeMode="contain" />
          <Text style={styles.headerTitle}>BRGY GO</Text>
        </View>
      </View>

      {/* Card */}
      {!showForm && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📄 Need a Barangay Document?</Text>
          <TouchableOpacity style={styles.requestBtn} onPress={() => setShowForm(true)}>
            <Ionicons name="document-text" size={20} color="#fff" />
            <Text style={styles.requestBtnText}>Request Document</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Request Form */}
      {showForm && (
        <ScrollView style={styles.form} contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.backBtn} onPress={() => setShowForm(false)}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.label}>Select Document Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={documentType} onValueChange={setDocumentType} style={styles.picker}>
              <Picker.Item label="-- Choose a document --" value="" />
              <Picker.Item label="Barangay Clearance" value="Barangay Clearance" />
              <Picker.Item label="Barangay ID" value="Barangay ID" />
              <Picker.Item label="Certificate of Indigency" value="Certificate of Indigency" />
              <Picker.Item label="Barangay Permit" value="Barangay Permit" />
              <Picker.Item label="Certificate of Residency" value="Certificate of Residency" />
            </Picker>
          </View>

          

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor={isDark ? '#ccc' : '#888'}
          />

          <Text style={styles.label}>Purpose</Text>
          <TextInput
            style={[styles.input, { height: 50 }]}
            value={purpose}
            onChangeText={setPurpose}
            placeholder="Enter purpose"
            multiline
            placeholderTextColor={isDark ? '#ccc' : '#888'}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Ionicons name="send" size={18} color="#fff" />
              <Text style={styles.submitText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* Requests List */}
      <Text style={styles.subHeader}>Your Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.table}
        ListEmptyComponent={<Text style={styles.emptyText}>No requests yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.rowItem}>{item.type}</Text>
            <Text style={styles.rowItem}>{item.status}</Text>
          </View>
        )}
      />

      {/* Chat Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setVisible(true)}>
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Chat Modal */}
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.chatBox}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>Chat Assistant</Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <Ionicons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <ChatScreen />
          </View>
        </View>
      </Modal>
    </View>
  );
}
