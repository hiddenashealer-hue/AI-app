import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { useScreenInsets } from '../hooks/useScreenInsets';
import { Spacing } from '../constants/theme';

type Props = ScrollViewProps & { children?: React.ReactNode };

export function ScreenScrollView({ children, contentContainerStyle, style, ...props }: Props) {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom, scrollInsetBottom } = useScreenInsets();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }, style]}
      contentContainerStyle={[{ paddingTop, paddingBottom }, styles.contentContainer, contentContainerStyle]}
      scrollIndicatorInsets={{ bottom: scrollInsetBottom }}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

export default ScreenScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
  },
});
