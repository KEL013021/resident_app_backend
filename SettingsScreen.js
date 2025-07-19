import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext'; // import theme

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme(); // get theme colors

  return (
    <View style={[styles.container, { backgroundColor: colors.header }]}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        {/* Optional title */}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
      >
        {/* Change Password */}
        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Ionicons name="key-outline" size={20} color={colors.icon} style={styles.icon} />
          <Text style={[styles.itemText, { color: colors.text }]}>Change Password</Text>
        </TouchableOpacity>

        {/* Edit Profile */}
        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Ionicons name="person-outline" size={20} color={colors.icon} style={styles.icon} />
          <Text style={[styles.itemText, { color: colors.text }]}>Edit Profile</Text>
        </TouchableOpacity>

        {/* About */}
        <TouchableOpacity
          style={[styles.item, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('About')}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={colors.icon}
            style={styles.icon}
          />
          <Text style={[styles.itemText, { color: colors.text }]}>About</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
  },
  icon: {
    width: 24,
  },
});
