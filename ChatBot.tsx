import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

interface Props {
  selectedLanguage: string;
}

export default function ChatBot({ selectedLanguage }: Props) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, `You: ${input}`]);
    setMessages(prev => [...prev, `You: ${input}`, `AI: (response placeholder)`]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}>
        {messages.map((msg, idx) => (
          <Text key={idx} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  messages: { maxHeight: 200, marginBottom: 8 },
  message: { marginVertical: 2 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 4 },
});
