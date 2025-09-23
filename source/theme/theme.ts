// /source/theme/theme.ts

// 1. Color Palette
// We're using a palette inspired by modern apps like Uber Eats.
// Neutral colors for the background, a vibrant primary color for calls-to-action.
export const Colors = {
  primary: '#FF7622',      // Vibrant orange for buttons and accents
  secondary: '#00205B',    // Dark blue for some text or secondary elements
  background: '#F7F7F7',   // A very light gray for the general background
  surface: '#FFFFFF',      // White for cards and surfaces
  text: '#1A1A1A',          // Soft black for main text
  textSecondary: '#6C757D', // Gray for subtitles and information
  border: '#EAEAEA',        // Light gray for borders
  success: '#28A745',       // Green for confirmations
  error: '#DC3545',         // Red for errors
};

// 2. Typography
// We are standardizing the use of the Montserrat font, which is already in the project.
export const Fonts = {
  // Font families
  family: {
    regular: 'Montserrat_400Regular',
    medium: 'Montserrat_500Medium',
    semiBold: 'Montserrat_600SemiBold',
    bold: 'Montserrat_700Bold',
  },
  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    md: 16, // Base size for body text
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
};

// 3. Spacing and Radii
// A consistent spacing grid (multiples of 4 or 8) is crucial.
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

export const Radii = {
  sm: 4,
  md: 8,
  lg: 16, // Base radius for cards
  full: 999,
};

const theme = { Colors, Fonts, Spacing, Radii };
export default theme;
