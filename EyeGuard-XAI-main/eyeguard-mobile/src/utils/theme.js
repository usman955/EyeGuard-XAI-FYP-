export const theme = {
  colors: {
    primary: '#410a07',          // Deep Maroon
    primaryDark: '#3c0705',
    primaryLight: '#ffdad6',
    primaryContainer: '#5d1f1a', 
    secondary: '#635e51',        // Muted Brown
    secondaryLight: '#e9e2d1',
    accent: '#dd847a', 
    background: '#fcf9f8',       // Creamy background
    surface: '#ffffff',
    surfaceGlass: 'rgba(255, 255, 255, 0.85)',
    text: '#1b1c1c', 
    textSecondary: '#544341', 
    textMuted: '#877270',
    border: '#d9c1be', 
    outline: '#877270',
    outlineVariant: '#d9c1be',
    
    // Status Colors
    error: '#ba1a1a', 
    errorContainer: '#ffdad6',
    danger: '#ba1a1a', 
    dangerLight: '#ffdad6',
    success: '#386a20', 
    successContainer: '#d1fae5',
    successLight: '#d1fae5',
    warning: '#934841', 
    info: '#696457',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
  },
  borderRadius: {
    s: 6,
    m: 12,
    l: 20,
    xl: 28,
    xxl: 36,
  },
  shadows: {
    card: {
      shadowColor: '#64748b',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 15,
      elevation: 5,
    },
    button: {
      shadowColor: '#410a07',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 4,
    },
    glass: {
      shadowColor: '#877270',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 3,
    }
  }
};
