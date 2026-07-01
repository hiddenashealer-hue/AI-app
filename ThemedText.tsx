import React, { ReactNode } from 'react';
import { Text, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  children: ReactNode;
  type?: 'body' | 'small' | 'title' | 'h4' | 'link';
}

export function ThemedText({ children, type = 'body', style, ...props }: ThemedTextProps) {
  const typeStyles: Record<string, any> = {
    body: { fontSize: 16, fontWeight: '400' },
    small: { fontSize: 12, fontWeight: '400' },
    title: { fontSize: 24, fontWeight: '700' },
    h4: { fontSize: 18, fontWeight: '600' },
    link: { fontSize: 16, fontWeight: '400', color: '#007AFF' },
  };

  return (
    <Text style={[typeStyles[type], style]} {...props}>
      {children}
    </Text>
  );
}
