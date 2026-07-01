import React, { createContext, useContext, ReactNode } from 'react';
import { Colors } from '../constants/theme';

type Theme = {
  backgroundRoot: string;
  backgroundDefault: string;
  inputBackground: string;
  border: string;
  text: string;
  textSecondary: string;
  tabIconSelected?: string;
  tabIconDefault?: string;
};

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
}

const defaultTheme: Theme = {
  backgroundRoot: Colors.light.backgroundRoot,
  backgroundDefault: Colors.light.backgroundDefault,
  inputBackground: Colors.light.inputBackground,
  border: Colors.light.border,
  text: Colors.light.text,
  textSecondary: Colors.light.textSecondary,
  tabIconSelected: Colors.light.primary,
  tabIconDefault: Colors.light.textSecondary,
};

const ThemeContext = createContext<ThemeContextType>({ theme: defaultTheme, isDark: false });

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{ theme: defaultTheme, isDark: false }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  return useContext(ThemeContext);
}
