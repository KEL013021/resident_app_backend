import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const ChatScreen = () => {
  const [language, setLanguage] = useState('en');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { colors, isDark } = useTheme();
  const flatListRef = useRef(null);

  const translations = {
    en: {
      greeting: 'Hello! How can I assist you with barangay services today?',
      unknown: "I'm sorry, I didn't understand that.",
      timeinfo: 'CERTIFICATE or CLEARANCE is available from 9:00 AM to 5:00 PM, MONDAY to FRIDAY at the Brgy. Hall.',
      jobseeker: `First-Time Job Seeker Certification:\n\n1. Go to Barangay Hall, request a slip from SBM or staff, and fill it out.\n2. Submit a valid ID.\n3. ID and residency checked.\n4. Short interview.\n5. Certificate printed and issued.\n6. Sign logbook.\n\n✅ Time: 20 mins\n✅ Fee: None\n✅ Staff: Secretary / Head Barangay`,
      certification: `Barangay Certification Process:\n\n1. Go to Barangay Hall and get a slip.\n2. Submit with valid ID or CTC.\n3. Review of documents.\n4. Issuance of certificate.\n5. Sign logbook.\n\n✅ Time: 20 mins\n✅ Fee: Varies\n✅ Staff: Barangay Staff`,
      clearance: `Barangay Clearance:\n\n1. Get a request slip and fill it out.\n2. Submit with valid ID or CTC.\n3. Processing.\n4. Pay ₱60.00.\n5. Get clearance.\n\n✅ Time: 20 mins\n✅ Fee: ₱60.00\n✅ Staff: Secretary, Treasurer, Captain`,
      residency: `Certificate of Residency:\n\n1. Get request slip.\n2. Submit with valid ID.\n3. Process.\n4. Pay ₱60.00.\n5. Get certificate.\n\n✅ Time: 20 mins\n✅ Fee: ₱60.00\n✅ Staff: Secretary, Treasurer, Captain`,
      indigency: 'Requirements for Certificate of Indigency:\n• Valid ID\n• Barangay Clearance\n• Proof of income (if any)\n• Personal appearance',
      idcard: `Barangay ID Card:\n\n1. Get request slip.\n2. Submit with valid ID.\n3. Pay ₱60.00.\n4. Get ID and sign logbook.\n\n✅ Time: 20 mins\n✅ Fee: ₱60.00\n✅ Staff: Barangay Staff`,
      businesspermit: `Barangay Business Clearance:\n\n1. Get request slip and fill it out.\n2. Submit with ID and CTC.\n3. Process.\n4. Pay ₱180.00.\n5. Get clearance.\n\n✅ Time: 20 mins\n✅ Fee: ₱180.00\n✅ Staff: Secretary, Treasurer, Captain`,
      seniorsoloparent: `Senior Citizen / Solo Parent Certification:\n\n1. Get request slip.\n2. Submit ID for review.\n3. Residency and ID verification.\n4. Interview and issue cert.\n5. Sign logbook.\n\n✅ Time: 20 mins\n✅ Fee: None\n✅ Staff: Secretary, Captain`,
    },
    fil: {
      greeting: 'Kamusta! Paano kita matutulungan sa barangay services?',
      unknown: 'Paumanhin, hindi ko naintindihan.',
      timeinfo: 'Ang CERTIFICATE o CLEARANCE ay mula alas-9 ng umaga hanggang alas-5 ng hapon, LUNES hanggang BIYERNES, sa ating Brgy. Hall.',
      jobseeker: `Sertipikasyon sa Unang Pag-aapply:\n\n1. Pumunta sa Barangay Hall at humingi ng slip.\n2. Magpasa ng valid ID.\n3. Suriin ng barangay.\n4. Panayam.\n5. Ibigay ang sertipiko.\n6. Pirma sa logbook.\n\n✅ Oras: 20 minuto\n✅ Bayad: Wala\n✅ Staff: Kalihim / Kapitan`,
      certification: `Barangay Certification:\n\n1. Kumuha ng slip.\n2. Magpasa ng valid ID o CTC.\n3. Suriin ang dokumento.\n4. Ibigay ang sertipikasyon.\n5. Pirma sa logbook.\n\n✅ Oras: 20 minuto\n✅ Bayad: Depende\n✅ Staff: Barangay Staff`,
      clearance: `Barangay Clearance:\n\n1. Humingi ng slip.\n2. Magpasa ng valid ID o CTC.\n3. Suriin at iproseso.\n4. Magbayad ng ₱60.00.\n5. Kunin ang clearance.\n\n✅ Oras: 20 minuto\n✅ Bayad: ₱60.00\n✅ Staff: Kalihim, Ingat-Yaman, Kapitan`,
      residency: `Sertipiko ng Paninirahan:\n\n1. Humingi ng slip.\n2. Magpasa ng valid ID.\n3. Suriin.\n4. Magbayad ng ₱60.00.\n5. Kunin ang sertipiko.\n\n✅ Oras: 20 minuto\n✅ Bayad: ₱60.00\n✅ Staff: Kalihim, Ingat-Yaman, Kapitan`,
      indigency: 'Mga Kailangan sa Sertipiko ng Kahirapan:\n• Valid ID\n• Barangay Clearance\n• Patunay ng kita (kung meron)\n• Personal na pagpunta',
      idcard: `Barangay ID:\n\n1. Humingi ng slip.\n2. Magpasa ng valid ID.\n3. Magbayad ng ₱60.00.\n4. Kunin ang ID at pumirma.\n\n✅ Oras: 20 minuto\n✅ Bayad: ₱60.00\n✅ Staff: Kawani ng Barangay`,
      businesspermit: `Barangay Business Clearance:\n\n1. Kumuha ng slip at sagutan.\n2. Magpasa ng ID at CTC.\n3. Suriin.\n4. Magbayad ng ₱180.00.\n5. Kunin ang clearance.\n\n✅ Oras: 20 minuto\n✅ Bayad: ₱180.00\n✅ Staff: Kalihim, Ingat-Yaman, Kapitan`,
      seniorsoloparent: `Senior Citizen / Solo Parent:\n\n1. Kumuha ng slip.\n2. Magpasa ng ID.\n3. Beripikasyon.\n4. Panayam at i-issue ang sertipiko.\n5. Pumirma sa logbook.\n\n✅ Oras: 20 minuto\n✅ Bayad: Wala\n✅ Staff: Kalihim / Kapitan`,
    },
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: translations[language].greeting, from: 'bot', key: 'greeting' }]);
    }
  }, []);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const getResponseKey = (text) => {
    const lower = text.toLowerCase();

    if (lower.includes('clearance')) return 'clearance';
    if (lower.includes('indigency')) return 'indigency';
    if (lower.includes('residency')) return 'residency';
    if (lower.includes('business permit') || lower.includes('barangay permit') || lower.includes('brgy permit')) return 'businesspermit';
    if (lower.includes('job seeker')) return 'jobseeker';
    if (lower.includes('certification')) return 'certification';

    // 👇 Time-related keywords
    if (
      lower.includes('time') ||
      lower.includes('oras') ||
      lower.includes('schedule') ||
      lower.includes('available')
    ) {
      return 'timeinfo';
    }

    // 👇 Senior / Solo Parent Keywords
    if (
      lower.includes('solo') ||
      lower.includes('parent') ||
      lower.includes('senior') ||
      lower.includes('solo parent') ||
      lower.includes('senior citizen')
    ) {
      return 'seniorsoloparent';
    }

    // 👇 ID-related
    if (
      lower.includes('identification card') ||
      lower.includes('barangay id') ||
      lower.includes('brgy id') ||
      lower.includes('barangay identification') ||
      lower.includes('id')
    ) {
      return 'idcard';
    }

    return 'unknown';
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const key = getResponseKey(input);
    const reply = translations[language]?.[key] || translations[language].unknown;
    const userMessage = { text: input, from: 'user' };
    const botMessage = { text: reply, from: 'bot', key };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  const handleToggleLanguage = () => {
    const newLang = language === 'en' ? 'fil' : 'en';
    setLanguage(newLang);
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.from === 'bot' && msg.key) {
          return { ...msg, text: translations[newLang][msg.key] || translations[newLang].unknown };
        }
        return msg;
      })
    );
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageWrapper,
        { alignItems: item.from === 'user' ? 'flex-end' : 'flex-start' },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor:
              item.from === 'user'
                ? isDark
                  ? '#2e6ff2'
                  : '#d9e2f7'
                : isDark
                ? '#333'
                : '#f0f0f0',
            borderWidth: item.from === 'user' ? 0 : 1,
            borderColor: item.from === 'user' ? 'transparent' : '#ccc',
          },
        ]}
      >
        <Text
          style={{
            color:
              item.from === 'user'
                ? isDark
                  ? '#fff'
                  : '#000'
                : isDark
                ? '#fff'
                : '#000',
          }}
        >
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <View style={styles.languageToggle}>
        <Text style={{ color: colors.text, marginRight: 8 }}>
          {language === 'en' ? 'Language: English' : 'Wika: Filipino'}
        </Text>
        <TouchableOpacity onPress={handleToggleLanguage}>
          <Ionicons name="globe-outline" size={24} color={isDark ? '#FFFFFF' : colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.chatArea}
      />

      <View style={[styles.inputContainer, { backgroundColor: colors.card }]}>
        <TextInput
          style={[styles.input, { color: colors.text, backgroundColor: colors.background }]}
          placeholder={language === 'en' ? 'Type a message' : 'Mag-type ng mensahe'}
          placeholderTextColor={isDark ? '#FFFFFF' : colors.text + '99'}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons name="send" size={24} color={isDark ? '#FFFFFF' : colors.primary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  languageToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
  },
  chatArea: {
    padding: 10,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    marginLeft: 8,
  },
});
