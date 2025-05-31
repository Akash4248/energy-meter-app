import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2563eb", // Blue 600
    accent: "#10b981", // Emerald 500
    background: "#f9fafb", // Gray 50
    surface: "#ffffff",
    text: "#111827", // Gray 900
    placeholder: "#6b7280", // Gray 500
    disabled: "#d1d5db", // Gray 300
    backdrop: "rgba(0, 0, 0, 0.5)",
    notification: "#ef4444", // Red 500

    // Custom colors for energy app
    peak: "#ef4444", // Red 500
    normal: "#f59e0b", // Amber 500
    offPeak: "#10b981", // Emerald 500
    success: "#059669", // Emerald 600
    warning: "#d97706", // Amber 600
    error: "#dc2626", // Red 600
    info: "#2563eb", // Blue 600
  },
  roundness: 8,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: "System",
      fontWeight: "400" as const,
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500" as const,
    },
    light: {
      fontFamily: "System",
      fontWeight: "300" as const,
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100" as const,
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
};
