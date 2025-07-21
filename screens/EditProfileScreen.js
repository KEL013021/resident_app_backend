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
  Switch,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from './ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfileScreen = ({ navigation }) => {
  const { isDark } = useTheme();

  const [dobDatePickerVisible, setDobDatePickerVisible] = useState(false);
  const [residencyDatePickerVisible, setResidencyDatePickerVisible] = useState(false);

  const [form, setForm] = useState({
    firstName: '', middleName: '', lastName: '', gender: '', dob: '',
    pobCountry: '', pobProvince: '', pobCity: '', pobBarangay: '',
    civilStatus: '', nationality: '', religion: '', country: '',
    province: '', city: '', barangay: '', zipcode: '', houseNumber: '',
    zonePurok: '', residencyDate: '', yearsOfResidency: '', residencyType: '',
    previousAddress: '', fatherName: '', motherName: '', spouseName: '',
    numberOfFamilyMembers: '', householdNumber: '', relationshipToHead: '',
    housePosition: '', educationalAttainment: '', currentSchool: '',
    occupation: '', monthlyIncome: '', mobileNumber: '', telephoneNumber: '',
    emailAddress: '', emergencyContactPerson: '', emergencyContactNumber: '',
    pwdStatus: false, pwdIdNumber: '', seniorCitizenStatus: false,
    seniorIdNumber: '', soloParentStatus: false,
    is4PsMember: false, fourPsIdNumber: '', bloodType: '', voterStatus: ''
  });

  const handleChange = (key, value) => {
    if (key === 'residencyDate') {
      const currentYear = new Date().getFullYear();
      const inputYear = new Date(value).getFullYear();
      const years = currentYear - inputYear;
      setForm({ ...form, residencyDate: value, yearsOfResidency: years.toString() });
    } else {
      setForm({ ...form, [key]: value });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: isDark ? '#121212' : '#6D84B4',
      },
      headerTintColor: '#fff',
    });
  }, [navigation, isDark]);

  const renderInput = (label, key, keyboard = 'default', placeholder = '') => (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0',
            color: isDark ? '#fff' : '#000',
          },
        ]}
        value={form[key]}
        placeholder={placeholder || label}
        placeholderTextColor={isDark ? '#888' : '#888'}
        keyboardType={keyboard}
        onChangeText={(text) => handleChange(key, text)}
      />
    </View>
  );

 const renderDropdown = (label, key, items) => (
  <View style={styles.pickerContainer}>
    <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>{label}</Text>
    <View
      style={[
        styles.pickerWrapper,
        { backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0' },
      ]}>
      <Picker
        selectedValue={form[key]}
        onValueChange={(value) => handleChange(key, value)}
        style={{
        color: isDark ? '#fff' : '#000',
        fontSize: 10,           // still keep this
        height: 60,             // 👈 added this
        marginTop: Platform.OS === 'android' ? -4 : 0, // tweak for Android
      }}>
        <Picker.Item label={`Select ${label}`} value="" />
        {items.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>
    </View>
  </View>
);



  const renderSwitch = (label, key, idKey = null, idPlaceholder = '') => (
    <View style={styles.switchContainer}>
      <View style={styles.switchRow}>
        <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>{label}</Text>
        <Switch
          value={form[key]}
          onValueChange={(value) => handleChange(key, value)}
        />
      </View>
      {(form[key] && idKey && idPlaceholder) && renderInput(idPlaceholder, idKey)}
    </View>
  );

  const handleSave = () => {
    console.log('Saving form data:', form);
    // Save logic here
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#a4b7deff' }]}>
        <View style={[styles.profileContainer, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>

          {renderInput('First Name', 'firstName')}
          {renderInput('Middle Name', 'middleName')}
          {renderInput('Last Name', 'lastName')}
          {renderInput('Gender', 'gender')}

          {/* Date of Birth Picker */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setDobDatePickerVisible(true)}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0', color: isDark ? '#fff' : '#000' },
                ]}
                value={form.dob}
                editable={false}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#888"
              />
            </TouchableOpacity>
          </View>

          {dobDatePickerVisible && (
            <DateTimePicker
              mode="date"
              value={form.dob ? new Date(form.dob) : new Date()}
              display={Platform.OS === 'android' ? 'calendar' : 'default'}
              onChange={(event, selectedDate) => {
                setDobDatePickerVisible(false);
                if (selectedDate) {
                  const isoDate = selectedDate.toISOString().split('T')[0];
                  handleChange('dob', isoDate);
                }
              }}
            />
          )}

          {renderInput('Nationality', 'nationality')}
          {renderInput('Religion', 'religion')}
          {renderDropdown('Civil Status', 'civilStatus', ['Single', 'Married', 'Divorced', 'Separated', 'Widowed'])}

          {renderInput('Country of Birth', 'pobCountry')}
          {renderInput('Province of Birth', 'pobProvince')}
          {renderInput('City/Municipality of Birth', 'pobCity')}
          {renderInput('Barangay of Birth', 'pobBarangay')}

          {renderInput('Current Country', 'country')}
          {renderInput('Province', 'province')}
          {renderInput('City/Municipality', 'city')}
          {renderInput('Barangay', 'barangay')}
          {renderInput('Zipcode', 'zipcode')}
          {renderInput('House Number', 'houseNumber')}
          {renderInput('Zone/Purok', 'zonePurok')}

          {/* Date of Residency Picker */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Date of Residency</Text>
            <TouchableOpacity onPress={() => setResidencyDatePickerVisible(true)}>
              <TextInput
                style={[
                  styles.input,
                  { backgroundColor: isDark ? '#1e1e1e' : '#f0f0f0', color: isDark ? '#fff' : '#000' },
                ]}
                value={form.residencyDate}
                editable={false}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#888"
              />
            </TouchableOpacity>
          </View>

          {residencyDatePickerVisible && (
            <DateTimePicker
              mode="date"
              value={form.residencyDate ? new Date(form.residencyDate) : new Date()}
              display={Platform.OS === 'android' ? 'calendar' : 'default'}
              onChange={(event, selectedDate) => {
                setResidencyDatePickerVisible(false);
                if (selectedDate) {
                  const isoDate = selectedDate.toISOString().split('T')[0];
                  const currentYear = new Date().getFullYear();
                  const residencyYear = selectedDate.getFullYear();
                  const computedYears = currentYear - residencyYear;

                  setForm(prev => ({
                    ...prev,
                    residencyDate: isoDate,
                    yearsOfResidency: computedYears.toString(),
                  }));
                }
              }}
            />
          )}

          {renderInput('Years of Residency', 'yearsOfResidency', 'numeric')}
          {renderDropdown('Type of Residency', 'residencyType', ['Non Migrant', 'Migrant', 'Transient'])}
          {renderInput('Previous Address', 'previousAddress')}
          {renderInput("Father's Name", 'fatherName')}
          {renderInput("Mother's Name", 'motherName')}
          {renderInput("Spouse's Name", 'spouseName')}
          {renderDropdown('Number of Family Members', 'numberOfFamilyMembers', Array.from({ length: 30 }, (_, i) => (i + 1).toString()))}
          {renderInput('Household Number', 'householdNumber')}
          {renderInput('Relationship to Head', 'relationshipToHead')}
          {renderInput('House Position', 'housePosition')}
          {renderInput('Educational Attainment', 'educationalAttainment')}
          {renderInput('Current School/University', 'currentSchool')}
          {renderInput('Occupation', 'occupation')}
          {renderInput('Monthly Income', 'monthlyIncome', 'numeric')}
          {renderInput('Mobile Number', 'mobileNumber', 'numeric')}
          {renderInput('Telephone Number', 'telephoneNumber', 'numeric')}
          {renderInput('Email Address', 'emailAddress')}
          {renderInput('Emergency Contact Person', 'emergencyContactPerson')}
          {renderInput('Emergency Contact Number', 'emergencyContactNumber', 'numeric')}
          {renderDropdown('Blood Type', 'bloodType', ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])}
          {renderDropdown('Voter Status', 'voterStatus', ['Non Voters', 'Voters'])}
          {renderSwitch('PWD?', 'pwdStatus', 'pwdIdNumber', 'PWD ID Number')}
          {renderSwitch('Senior Citizen?', 'seniorCitizenStatus', 'seniorIdNumber', 'Senior Citizen ID Number')}
          {renderSwitch('Solo Parent?', 'soloParentStatus')}
          {renderSwitch('4Ps Member?', 'is4PsMember')}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  profileContainer: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    margin: 10,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  pickerContainer: {
    marginBottom: 16,
  },
 pickerWrapper: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  height: 40, // 👈 smaller height
  justifyContent: 'center',

},

  switchContainer: {
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
