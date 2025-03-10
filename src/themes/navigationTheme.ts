import type {Theme} from '@react-navigation/native';
import {DefaultTheme} from '@react-navigation/native';

const navigationTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
  },
};
export default navigationTheme;
