import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const greys = {
  50: '#F7FAFC',
  100: '#EDF2F7',
  200: '#E2E8F0',
  300: '#CBD5E0',
  400: '#A0AEC0',
  500: '#718096',
  600: '#4A5568',
  700: '#2D3748',
  800: '#1A202C',
  900: '#171923',
};

const redditOrange = {
  main: '#FF4301',
};

const skyBlue = {
  main: '#5296DD',
};

const easyBlue = {
  main: '#92BDDF',
};

const theme = createMuiTheme({
  spacing: (factor) => `${0.8 * factor}rem`,
  typography: {
    htmlFontSize: 10,
    h1: {
      fontSize: '3.5rem',
      lineHeight: '4.4rem',
      fontWeight: '900',
      letterSpacing: 0,
    },
    h2: {
      fontSize: '2.8rem',
      lineHeight: '3.3rem',
      letterSpacing: 0,
      fontWeight: '700',
    },
    h3: {
      fontSize: '2.2rem',
      lineHeight: '2.7rem',
      fontWeight: '500',
    },
    h4: {
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: '300',
    },
    h5: {
      fontSize: '1.6rem',
      lineHeight: '2.1rem',
      fontWeight: '300',
    },
    h6: {
      fontSize: '1.3rem',
      lineHeight: '1.8rem',
    },
    body1: {
      fontSize: '1.3rem',
      lineHeight: '1.8rem',
    },
    body2: {
      fontSize: '1.1rem',
      lineHeight: '1.5rem',
    },
    subtitle1: {
      fontSize: '1.5rem',
      lineHeight: '2rem',
      fontWeight: '600',
    },
  },
  palette: {
    primary: {
      ...redditOrange,
    },
    secondary: {
      ...skyBlue,
    },
    accent: {
      ...easyBlue,
    },
    grey: {
      ...greys,
    },
    text: {
      primary: fade(greys[900], 0.87),
      secondary: fade(greys[900], 0.6),
    },
    background: {
      default: '#F7FAFC',
    },
  },
});

export default theme;
