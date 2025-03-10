import type {DefaultTheme} from 'styled-components/native';
import commonTheme from './commonTheme';

const darkTheme: DefaultTheme = {
  ...commonTheme,
  colors: {
    backgroundGradient1: '#24234C',
    backgroundGradient2: '#0F0F1C',
    grey: '#C7C7C7',
    light: '#FFFFFF',
    pink: '#FF6BFA',
    purpleGradient1: '#75BCFC',
    purpleGradient2: '#F355FF',
    purpleLight: '#484692',
    purpleLighter: '#6C6CF4',
    purpleLightest: '#9997FF',
    placeholder: '#8C8C8C',
    red: '#f50057',
    placeholderBg: '#8C8C8C50',
  },
};

export default darkTheme;
