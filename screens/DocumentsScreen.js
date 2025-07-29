import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Modal, StyleSheet, ScrollView, FlatList
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import ChatScreen from './Chatscreen';
import { useTheme } from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from './config';

export default function DocumentsScreen({ navigation }) {
  const { isDark, colors } = useTheme();

  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [documentType, setDocumentType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const id = await AsyncStorage.getItem('user_id');
        if (id !== null) {
          const parsedId = parseInt(id);
          setUserId(parsedId);
          fetchRequests(parsedId);
        }
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    };
    initializeData();
  }, []);

  const fetchRequests = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/RESIDENT_COPY1/database/get_request.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId }),
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests);
      } else {
        console.warn(data.message || 'No request data returned');
      }
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/RESIDENT_COPY1/database/get_services.php`)
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error('Error fetching services:', err));
  }, []);

  const handleSubmit = () => {
    if (!purpose || !documentType || !userId) {
      alert('Please complete all fields.');
      return;
    }

    const requestData = {
      user_id: userId,
      service_id: documentType,
      purpose: purpose,
    };

    fetch(`${BASE_URL}/RESIDENT_COPY1/database/submit_request.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchRequests(userId);
          setPurpose('');
          setDocumentType('');
          setShowForm(false);
        } else {
          alert('Failed to submit request.');
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred.');
      });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.headerTitle, { color: 'white' }]}>Barangay Services</Text>
      </View>

      {!showForm && (
        <>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.cardTitle, { color: colors.text, fontSize: 18, fontWeight: 'bold' }]}>
              📄 Need a Barangay Document?
            </Text>
            <TouchableOpacity style={styles.requestBtn} onPress={() => setShowForm(true)}>
              <Ionicons name="document-text" size={20} color="#fff" />
              <Text style={styles.requestBtnText}>Request Document</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.requestsContainer, { backgroundColor: colors.header }]}>
            <Text style={[styles.subHeader, { color: '#fff' }]}>Your Requests</Text>
            <View style={styles.scrollArea}>
              <FlatList
                data={requests}
                keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
                contentContainerStyle={styles.table}
                ListEmptyComponent={<Text style={styles.emptyText}>No requests yet.</Text>}
                renderItem={({ item }) => (
                  <View style={[styles.tableRow, { backgroundColor: colors.card }]}>
                    <Text style={[styles.rowItem, { color: colors.text }]}>{item.service_name}</Text>
                    <Text style={[styles.rowItem, { color: colors.text }]}>{item.status}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </>
      )}

      {showForm && (
        <ScrollView style={styles.form} contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.formCard, { backgroundColor: colors.card }]}>
            <TouchableOpacity style={styles.backBtn} onPress={() => setShowForm(false)}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
              <Text style={[styles.backText, { color: colors.text }]}>Back</Text>
            </TouchableOpacity>

            <Text style={[styles.label, { color: colors.label, marginTop: 30}]}>Select Document Type</Text>
            <View style={[styles.pickerWrapper, { backgroundColor: colors.inputBackground }]}>
              <Picker
                selectedValue={documentType}
                onValueChange={(value) => setDocumentType(value)}
                style={[styles.picker, { color: colors.text }]}
              >
                <Picker.Item label="-- Choose a document --" value="" />
                {services.map(service => (
                  <Picker.Item
                    key={service.id}
                    label={`${service.service_name} (₱${service.service_fee})`}
                    value={service.id}
                  />
                ))}
              </Picker>
            </View>

            <Text style={[styles.label, { color: colors.label }]}>Purpose</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text, height: 55 }]}
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
          </View>
        </ScrollView>
      )}

      <TouchableOpacity style={styles.floatingButton} onPress={() => setVisible(true)}>
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.chatBox, { backgroundColor: colors.card }]}>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 17,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: 'center',
    elevation: 20,
  },
  headerTitle: { fontSize: 32, fontWeight: 'bold' },
  card: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 15,
    elevation: 10,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#407BFF',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  requestBtnText: { color: '#fff', fontSize: 16, marginLeft: 10, fontWeight: 'bold' },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  backText: { fontWeight: 'bold', marginLeft: 5, fontSize: 16 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  pickerWrapper: {
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: { height: 55 },
  input: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  form: { marginHorizontal: 20 },
  formContent: { paddingBottom: 100 },
  buttonContainer: { alignItems: 'center', marginTop: 10 },
  submitBtn: {
    flexDirection: 'row',
    backgroundColor: '#30C45D',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  submitText: { color: '#fff', fontWeight: 'bold', marginLeft: 8, fontSize: 16 },
  requestsContainer: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    margin: 20,
    elevation: 10,
  },
  scrollArea: { flexGrow: 1, paddingBottom: 60 },
  subHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  table: { paddingBottom: 20 },
  tableRow: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: { fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontStyle: 'italic', color: '#ccc', marginTop: 20 },
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
  chatTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  formCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 15,
    elevation: 10,
    width: '95%',
    marginLeft: 9,
  },
});
