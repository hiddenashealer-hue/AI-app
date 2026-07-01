import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface HeaderTitleProps extends TextProps {
  title: string;
}

export function HeaderTitle({ title, style, ...props }: HeaderTitleProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
