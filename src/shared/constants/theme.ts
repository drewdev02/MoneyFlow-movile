/**
 * Theme/colors/fonts/radii/spacing for MoneyFlow
 * Use ONLY these tokens for backgrounds, text, borders, and padding
 */
import { LinearGradientProps } from 'expo-linear-gradient';
import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    surface: '#F4F4F8', // Card backgrounds
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#2563eb', // Vibrant blue
    income: '#388e3c', // Green
    expense: '#e53935', // Red
    accent: '#7c3aed', // Purple
    gradientStart: '#e3e3ed', // Light purple gradient
    gradientEnd: '#fff',      // White gradient
  },
  dark: {
    text: '#ECEDEE',
    background: '#0F1014',
    surface: '#1E1F26',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#4D81F7',
    income: '#4CAF50',
    expense: '#F44336',
    accent: '#8B5CF6',
    gradientStart: '#1A1C2E',
    gradientEnd: '#0F1014',
  },
};

// Global gradients and custom colors used in multiple places
export const GlobalGradients = {
  authBackground: ['#0F1014', '#1F1235', '#0F1014'] as LinearGradientProps['colors'],
  logo: ['#8E2DE2', '#4A00E0'] as LinearGradientProps['colors'],
};

export const Radii = {
  xs: 3,
  sm: 5,
  md: 8,
  lg: 12,
  xl: 20,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const FontWeights = {
  regular: Platform.OS === 'ios' ? '400' : 'normal',
  medium: Platform.OS === 'ios' ? '500' : 'bold',
  bold: Platform.OS === 'ios' ? '700' : 'bold',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Usage notes:
// Use Colors[theme][token] for background/text colors
// Use Radii.* for border radii
// Use Spacing.* for padding/margin
// Use FontSizes.* and FontWeights.* in text styles
// Use Fonts.sans/serif/rounded/mono where needed
