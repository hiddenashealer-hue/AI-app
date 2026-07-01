import React from 'react';
import { Platform, ScrollViewProps, StyleSheet } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { useScreenInsets } from '../hooks/useScreenInsets';
import { Spacing } from '../constants/theme';
import ScreenScrollView from './ScreenScrollView';

type Props = ScrollViewProps & { children?: React.ReactNode };

export function ScreenKeyboardAwareScrollView({
  children,
  contentContainerStyle,
  style,
  keyboardShouldPersistTaps = 'handled',
  ...props
}: Props) {
  const { theme } = useTheme();
  const { paddingTop, paddingBottom, scrollInsetBottom } = useScreenInsets();

  // Use ScreenScrollView for all platforms (KeyboardAwareScrollView not available)
  return (
    <ScreenScrollView
      style={style}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      {...props}
    >
      {children}
    </ScreenScrollView>
  );
}

export default ScreenKeyboardAwareScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Spacing.xl,
  },
});
