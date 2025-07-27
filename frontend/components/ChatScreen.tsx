
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, Text, ScrollView, Platform } from 'react-native';
import axios from 'axios';

export default function ChatScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const API_URL = Platform.OS === 'web' ? 'http://localhost:8000/chatbot/' : 'http://10.0.2.2:8000/chatbot/';

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post(API_URL, { question: input });
      setMessages([...newMessages, { from: 'bot', text: res.data.response }]);
    } catch (err) {
      setMessages([...newMessages, { from: 'bot', text: 'Error contacting server.' }]);
    }

    setInput('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView
        style={{ flex: 1, marginBottom: 20 }}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={{
              marginVertical: 5,
              color: msg.from === 'user' ? 'blue' : 'green',
              fontSize: 16
            }}
          >
            {msg.from === 'user' ? 'You: ' : 'Bot: '}
            {msg.text}
          </Text>
        ))}
      </ScrollView>

      <TextInput
        placeholder="Ask your legal question..."
        value={input}
        onChangeText={setInput}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10,
          borderRadius: 5
        }}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
