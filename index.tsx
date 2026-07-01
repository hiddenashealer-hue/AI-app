import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ChatBot from '../../components/ChatBot';
import VideoPlayer from '../../components/VideoPlayer';
import LanguageSelector from '../../components/LanguageSelector';
import VoiceInput from '../../components/VoiceInput';

export default function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Welcome to HS AI App!</Text>

        {/* Language Selector */}
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onChangeLanguage={setSelectedLanguage}
        />

        {/* Chatbot */}
        <ChatBot selectedLanguage={selectedLanguage} />

        {/* Voice Input */}
        <VoiceInput onResult={(text) => console.log('Voice input:', text)} />

        {/* Video Player */}
        <VideoPlayer videoUrl={videoUrl} />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
