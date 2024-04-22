import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import userService from '../../user.service.js';

const ChatGPTComponent = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      alert('Please enter a question.');
      return;
    }
    setLoading(true);
    try {
      const response = await userService.askQuestion(question);
      setAnswer(response.answer); // Assuming the backend sends back an object with an 'answer' key
    } catch (error) {
      console.error('Failed to fetch answer:', error);
      alert('Failed to get an answer. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ask a Question</Text>
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
      <Text style={styles.response}>{answer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ChatGPTComponent;