import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import SettingsIcon from 'react-native-vector-icons/Ionicons';
import userService from '../../user.service.js';

const ChatGPTComponent = () => {
    const navigate = useNavigation();
    const handleHomeNav = () => navigate.navigate('Home');
    const handleClassSelectNav = () => navigate.navigate('ClassSelect');
    const handleSettingsNav = () => navigate.navigate('Settings');
    const handleChatNav = () => navigate.navigate('Chat');

  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert('Please enter a question.');
      return;
    }
    setLoading(true);
    const trimmedQuestion = question.trim();
    try {
      const response = await userService.askQuestion(trimmedQuestion);
      const newEntry = { question: trimmedQuestion, answer: response.answer };
      setConversation([...conversation, newEntry]);
      setQuestion('');  // Clear the input after submitting
    } catch (error) {
      console.error('Failed to fetch answer:', error);
      alert('Failed to get an answer. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask us a Question</Text>
      <ScrollView style={styles.chatContainer}>
        {conversation.map((entry, index) => (
          <View key={index} style={styles.chatEntry}>
            <Text style={styles.question}>{entry.question}</Text>
            <Text style={styles.answer}>{entry.answer}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question here..."
          value={question}
          onChangeText={setQuestion}
        />
        <Button
          title={loading ? 'Asking...' : 'Ask Question'}
          onPress={handleAskQuestion}
          disabled={loading}
        />
      </View>
      {/* Navigation Bar */}
      <View style={{ ...styles.navigationBar, borderTopColor: 'gray', borderTopWidth: 0.4 }}>
                <TouchableOpacity style={styles.navButton} onPress={handleHomeNav}>
                    <HomeIcon name="home" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleClassSelectNav}>
                    <SettingsIcon name="school-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleChatNav}>
                    <SettingsIcon name="chatbubble-ellipses-outline" size={28} color="#C28E0C" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton} onPress={handleSettingsNav}>
                    <SettingsIcon name="settings-outline" size={24} color="black" />
                </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  chatEntry: {
    marginBottom: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: 'darkgrey',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default ChatGPTComponent;