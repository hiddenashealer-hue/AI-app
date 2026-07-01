import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useScreenInsets() {
  const insets = useSafeAreaInsets();

  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    scrollInsetBottom: insets.bottom,
  };
}
