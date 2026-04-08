export const colors = {
  primary: '#00ffd1',
  primaryDim: '#00e9bf',
  primaryFixed: '#00f9cc',
  secondary: '#2ff801',
  secondaryDim: '#2be800',
  background: '#0d0e13',
  surface: '#0d0e13',
  surfaceContainerLowest: '#090a0f',
  surfaceContainerLow: '#121319',
  surfaceContainerHigh: '#1e1f26',
  surfaceContainerHighest: '#24252d',
  surfaceBright: '#2a2c34',
  tertiary: '#ff7073',
  error: '#ff716c',
  onPrimary: '#006653',
  onSurface: '#f7f5fd',
  onSurfaceVariant: '#abaab1',
  outlineVariant: '#47474e',
} as const;

export type ColorKey = keyof typeof colors;

export const colorsWithAlpha = {
  primary: (alpha: number) => `rgba(0, 255, 209, ${alpha})`,
  secondary: (alpha: number) => `rgba(47, 248, 1, ${alpha})`,
  background: (alpha: number) => `rgba(13, 14, 19, ${alpha})`,
  onPrimary: (alpha: number) => `rgba(0, 102, 83, ${alpha})`,
} as const;
