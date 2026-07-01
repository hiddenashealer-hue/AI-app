import { Colors } from '../constants/theme';

type Theme = {
  backgroundRoot: string;
  backgroundDefault: string;
  backgroundSecondary: string;
  inputBackground: string;
  border: string;
  text: string;
  textSecondary: string;
  link: string;
  buttonText: string;
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
  backgroundSecondary: Colors.light.background,
  inputBackground: Colors.light.inputBackground,
  border: Colors.light.border,
  text: Colors.light.text,
  textSecondary: Colors.light.textSecondary,
  link: Colors.light.primary,
  buttonText: '#FFFFFF',
  tabIconSelected: Colors.light.primary,
  tabIconDefault: Colors.light.textSecondary,
};

// Minimal non-JSX exports to avoid parsing JSX in .ts files during build
export function ThemeProvider({ children }: { children: any }) {
  return children;
}

export function useTheme(): ThemeContextType {
  return { theme: defaultTheme, isDark: false };
}
