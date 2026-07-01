import React, { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

interface ThemedViewProps extends ViewProps {
  children: ReactNode;
}

export function ThemedView({ children, style, ...props }: ThemedViewProps) {
  return (
    <View style={style} {...props}>
      {children}
    </View>
  );
}
