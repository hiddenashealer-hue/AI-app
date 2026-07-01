import React from 'react';
import { View, Button } from 'react-native';

interface Props {
  onResult: (text: string) => void;
}

export default function VoiceInput({ onResult }: Props) {
  const handleRecord = () => {
    // Placeholder for voice input functionality
    onResult('Voice input placeholder');
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Button title="Record Voice" onPress={handleRecord} />
    </View>
  );
}
