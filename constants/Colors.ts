export const StatusColors = {
  success: {
    primary: '#16A34A',
    secondary: '#22C55E',
    background: '#DCFCE7',
    text: '#14532D',
    border: '#86EFAC',
  },
  error: {
    primary: '#DC2626',
    secondary: '#EF4444',
    background: '#FEE2E2',
    text: '#7F1D1D',
    border: '#FCA5A5',
  },
  warning: {
    primary: '#D97706',
    secondary: '#F59E0B',
    background: '#FEF3C7',
    text: '#78350F',
    border: '#FCD34D',
  },
  info: {
    primary: '#0891B2',
    secondary: '#06B6D4',
    background: '#CFFAFE',
    text: '#164E63',
    border: '#67E8F9',
  },
};

export const Colors = {
  light: {
    primary: {
      main: '#1E40AF',
      light: '#60A5FA',
      dark: '#1E3A8A',
      contrast: '#E1E1E1',
    },
    secondary: {
      main: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      elevated: '#E3E4E6',
      muted: '#E9EAEB',
    },
    text: {
      primary: '#111827',
      secondary: '#4B5563',
      disabled: '#9CA3AF',
      muted: '#6B7280',
    },
    border: {
      light: '#E5E7EB',
      main: '#D1D5DB',
      dark: '#9CA3AF',
    },
    icon: {
      primary: '#1E40AF',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    divider: '#E5E7EB',
  },
  dark: {
    primary: {
      main: '#F97316',
      light: '#FB923C',
      dark: '#EA580C',
      contrast: '#FFFFFF',
    },
    secondary: {
      main: '#9CA3AF',
      light: '#D1D5DB',
      dark: '#6B7280',
      contrast: '#FFFFFF',
    },
    background: {
      default: '#111827',
      paper: '#374151',
      elevated: '#1F2937',
      muted: '#1F2937',
    },
    text: {
      primary: '#F9FAFB',
      secondary: '#D1D5DB',
      disabled: '#6B7280',
      muted: '#9CA3AF',
    },
    border: {
      light: '#374151',
      main: '#4B5563',
      dark: '#6B7280',
    },
    icon: {
      primary: '#F97316',
      secondary: '#D1D5DB',
      disabled: '#6B7280',
    },
    divider: '#374151',
  },
  ...StatusColors,
} as const;
