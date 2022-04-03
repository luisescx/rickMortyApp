const colors = {
  primary: '#1F7476',
  secondary: '#F0e14A',
  secondary_light: `${'rgba(240, 225, 74, 0.6)'}`,
  background: '#040809',
  background_light: `${'rgba(4, 8, 9, 0.9)'}`,

  success: '#26AF46',
  successLight: '#E4FFEB',

  error: '#CF1E2A',
  errorLight: '#FFEAEB',
};

type Keys = keyof typeof colors;

export type Color = typeof colors[Keys];

export default colors;
