import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';

interface Props {
  videoUrl: string | null;
}

export default function VideoPlayer({ videoUrl }: Props) {
  if (!videoUrl) {
    return <Text style={styles.placeholder}>Video will appear here</Text>;
  }

  return (
    <Video
      source={{ uri: videoUrl }}
      style={styles.video}
      useNativeControls
      resizeMode="contain"
      shouldPlay
    />
  );
}

const styles = StyleSheet.create({
  video: { width: '100%', height: 200, marginTop: 16 },
  placeholder: { marginTop: 16, textAlign: 'center', fontStyle: 'italic', color: '#888' },
});
