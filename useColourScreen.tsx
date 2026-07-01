import { useColorScheme as useRNColorScheme } from "react-native";

/**
 * Hook to get the current color scheme (light or dark mode)
 * Native implementation - uses React Native's useColorScheme hook directly
 */
export function useColorScheme() {
  return useRNColorScheme();
}
