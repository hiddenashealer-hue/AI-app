import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function VideoPreviewScreen() {
  return (
    <View style={styles.container}>
      <Text>Video Preview Screen</Text>
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
