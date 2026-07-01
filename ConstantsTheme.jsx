import { Platform } from "react-native";

const tintColorLight = "#007AFF";
const tintColorDark = "#0A84FF";
const primaryBlue = "#4A90E2";
const secondaryPurple = "#7B68EE";
const accentGreen = "#4CAF50";
const errorRed = "#F44336";

export const Colors = {
  light: {
    text: "#212121",
    textSecondary: "#757575",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: primaryBlue,
    link: primaryBlue,
    backgroundRoot: "#FFFFFF",
    backgroundDefault: "#F8F9FA",
    backgroundSecondary: "#F2F2F2",
    backgroundTertiary: "#E6E6E6",
    primary: primaryBlue,
    secondary: secondaryPurple,
    accent: accentGreen,
    error: errorRed,
    chatBubbleUser: primaryBlue,
    chatBubbleAI: "#F2F2F2",
    chatBubbleUserText: "#FFFFFF",
    chatBubbleAIText: "#212121",
    border: "#E0E0E0",
    inputBackground: "#F5F5F5",
  },
  dark: {
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#5A9EF0",
    link: "#5A9EF0",
    backgroundRoot: "#121212",
    backgroundDefault: "#1E1E1E",
    backgroundSecondary: "#2A2A2A",
    backgroundTertiary: "#353535",
    primary: "#5A9EF0",
    secondary: "#9B8BFF",
    accent: "#66BB6A",
    error: "#EF5350",
    chatBubbleUser: "#5A9EF0",
    chatBubbleAI: "#2A2A2A",
    chatBubbleUserText: "#FFFFFF",
    chatBubbleAIText: "#FFFFFF",
    border: "#404040",
    inputBackground: "#2A2A2A",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 48,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
  fabSize: 56,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: "700" },
  h2: { fontSize: 28, lineHeight: 36, fontWeight: "700" },
  h3: { fontSize: 24, lineHeight: 32, fontWeight: "600" },
  h4: { fontSize: 20, lineHeight: 28, fontWeight: "600" },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
  small: { fontSize: 14, lineHeight: 20, fontWeight: "400" },
  link: { fontSize: 16, lineHeight: 24, fontWeight: "400" },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadow = {
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
};
