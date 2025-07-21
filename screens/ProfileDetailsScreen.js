import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const ProfileDetailsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [profileData, setProfileData] = useState({});
  const loggedInEmail = 'sample@gmail.com';

  useEffect(() => {
    fetch(`http://192.168.1.9/RESIDENT/database/profiledetails.php?gmail=${loggedInEmail}`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          setProfileData(data);
        } else {
          console.warn(data.error);
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const profileItems = [
    { label: 'Email', key: 'email_address' },
    { label: 'Full Name', key: 'full_name' },
    { label: 'Birthday', key: 'date_of_birth' },
    { label: 'Phone Number', key: 'mobile_number' },
    { label: 'Sex', key: 'gender' },
    { label: 'Educational Level', key: 'educational_attainment' },
    { label: 'Household Number', key: 'household_number' },
    { label: 'Sitio', key: 'zone_purok' },
    { label: 'Civil Status', key: 'civil_status' },
    { label: 'Nationality', key: 'nationality' },
    { label: 'Religion', key: 'religion' },
    { label: 'Province', key: 'province' },
    { label: 'City', key: 'city' },
    { label: 'Barangay', key: 'barangay' },
    { label: 'Zipcode', key: 'zipcode' },
    { label: 'Occupation', key: 'occupation' },
    { label: 'Monthly Income', key: 'monthly_income' },
    { label: 'Voter Status', key: 'voter_status' },
    { label: 'Blood Type', key: 'blood_type' },
    { label: 'Spouse Name', key: 'spouse_name' },
    { label: 'No. of Family Members', key: 'number_of_family_members' },
    { label: 'Relationship to Head', key: 'relationship_to_head' },
    { label: 'Residency Date', key: 'residency_date' },
    { label: 'Years of Residency', key: 'years_of_residency' },
  ];

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
          <FontAwesome name="user" size={80} color={colors.icon} />
        </View>

        <View style={[styles.profileInfo, { backgroundColor: colors.card }]}>
          {profileItems.map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={[styles.label, { color: colors.label }]}>{item.label}:</Text>
              <Text style={[styles.value, { color: colors.value }]}>
                {profileData[item.key] ? profileData[item.key] : 'N/A'}
              </Text>
            </View>
          ))}
        </View>
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
    paddingTop: 50,
    paddingBottom: 15,
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
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  profileContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileInfo: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  value: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
});
