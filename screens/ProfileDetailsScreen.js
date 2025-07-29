import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileDetailsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedId = await AsyncStorage.getItem('user_id');
        if (storedId) {
          const response = await fetch(`http://10.50.144.130/RESIDENT_COPY1/database/profiledetails.php?user_id=${storedId}`);
          const data = await response.json();

          if (!data.error) {
            setProfileData(data);
          } else {
            console.warn(data.error);
          }
        } else {
          console.warn('No user_id found in storage');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProfile();
  }, []);

  const sections = [
    {
      title: 'Basic Information',
      data: [
        { label: 'Full Name', key: 'full_name' },
        { label: 'Birthday', key: 'date_of_birth' },
        { label: 'Gender', key: 'gender' },
        { label: 'Civil Status', key: 'civil_status' },
        { label: 'Nationality', key: 'nationality' },
        { label: 'Religion', key: 'religion' },
        { label: 'Blood Type', key: 'blood_type' },
      ],
    },
    {
      title: 'Address',
      data: [
        { label: 'Province', key: 'province' },
        { label: 'City', key: 'city' },
        { label: 'Barangay', key: 'barangay' },
        { label: 'Zipcode', key: 'zipcode' },
        { label: 'House Number', key: 'house_number' },
        { label: 'Sitio / Purok', key: 'zone_purok' },
      ],
    },
    {
      title: 'Contact Information',
      data: [
        { label: 'Email Address', key: 'email_address' },
        { label: 'Mobile Number', key: 'mobile_number' },
        { label: 'Telephone Number', key: 'telephone_number' },
      ],
    },
    {
      title: 'Residency',
      data: [
        { label: 'Residency Date', key: 'residency_date' },
        { label: 'Years of Residency', key: 'years_of_residency' },
        { label: 'Residency Type', key: 'residency_type' },
        { label: 'Previous Address', key: 'previous_address' },
      ],
    },
    {
      title: 'Household Info',
      data: [
        { label: 'Household Number', key: 'household_number' },
        { label: 'Relationship to Head', key: 'relationship_to_head' },
        { label: 'House Position', key: 'house_position' },
        { label: '4Ps Member', key: 'is_4ps_member' },
      ],
    },
    {
      title: 'Education & Occupation',
      data: [
        { label: 'Educational Attainment', key: 'educational_attainment' },
        { label: 'Current School', key: 'current_school' },
        { label: 'Occupation', key: 'occupation' },
        { label: 'Monthly Income', key: 'monthly_income' },
      ],
    },
    {
      title: 'Spouse & Family',
      data: [
        { label: 'Spouse Name', key: 'spouse_name' },
        { label: 'Number of Family Members', key: 'number_of_family_members' },
        { label: 'Father Name', key: 'father_name' },
        { label: 'Mother Name', key: 'mother_name' },
      ],
    },
    {
      title: 'Government Status',
      data: [
        { label: 'Voter Status', key: 'voter_status' },
        { label: 'PWD Status', key: 'pwd_status' },
        { label: 'PWD ID', key: 'pwd_id_number' },
        { label: 'Senior Citizen', key: 'senior_citizen_status' },
        { label: 'Senior ID', key: 'senior_id_number' },
        { label: 'Solo Parent', key: 'solo_parent_status' },
      ],
    },
    {
      title: 'Emergency Contact',
      data: [
        { label: 'Contact Person', key: 'emergency_contact_person' },
        { label: 'Contact Number', key: 'emergency_contact_number' },
      ],
    },
  ];

  const renderProfileValue = (value) => {
    return value && value !== '' ? value : 'N/A';
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.profileContent}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.avatarBackground }]}>
          {profileData.image_url ? (
            <Image
              source={{ uri: `http://10.50.144.130/../../BRGYGO/uploads/${profileData.image_url}` }}
              style={styles.avatarImage}
            />
          ) : (
            <Ionicons name="person-circle" size={80} color={colors.icon} />
          )}
        </View>

        {sections.map((section, i) => (
          <View key={i} style={[styles.sectionCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>{section.title}</Text>
            {section.data.map((item, index) => (
              <View key={index} style={styles.profileItem}>
                <Text style={[styles.label, { color: colors.label }]}>{item.label}:</Text>
                <Text style={[styles.value, { color: colors.value }]}>
                  {renderProfileValue(profileData[item.key])}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 15,
    marginTop: -10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: -10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },
  value: {
    fontSize: 15,
  },
});
