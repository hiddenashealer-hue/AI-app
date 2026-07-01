import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

type TopicDetailScreenRouteProp = RouteProp<
  { TopicDetail: { topic: string; category: string } },
  'TopicDetail'
>;

interface TopicDetailScreenProps {
  route: TopicDetailScreenRouteProp;
}

export default function TopicDetailScreen({ route }: TopicDetailScreenProps) {
  const { topic, category } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{topic}</Text>
      <Text style={styles.subtitle}>{category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
});
