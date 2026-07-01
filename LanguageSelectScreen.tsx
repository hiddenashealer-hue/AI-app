import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LanguageSelectScreen() {
  return (
    <View style={styles.container}>
      <Text>Language Select Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
