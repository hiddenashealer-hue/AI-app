import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '../Contexts/ChatContext';

export default function ChatScreen() {
  const { messages, isTyping, sendMessage } = useChat();
  const [text, setText] = useState('');

  const handleSend = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setText('');
    await sendMessage(trimmed);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.isUser ? styles.user : styles.ai]}>
            <Text style={styles.bubbleText}>{item.text}</Text>
          </View>
        )}
      />

      {isTyping ? <Text style={styles.typing}>AI is typing...</Text> : null}

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message"
          style={styles.input}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendLabel}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16 },
  bubble: { marginVertical: 6, padding: 12, borderRadius: 8, maxWidth: '80%' },
  user: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  ai: { backgroundColor: '#F1F0F0', alignSelf: 'flex-start' },
  bubbleText: { fontSize: 16 },
  inputRow: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#eee' },
  input: { flex: 1, padding: 10, backgroundColor: '#fafafa', borderRadius: 6 },
  sendButton: { marginLeft: 8, justifyContent: 'center', paddingHorizontal: 12 },
  sendLabel: { color: '#007AFF', fontWeight: '600' },
  typing: { paddingHorizontal: 16, paddingBottom: 8, color: '#666' },
});
