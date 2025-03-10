import styled from 'styled-components/native';
import {KeyboardAvoidingView, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const StyledMainContainer = styled(SafeAreaView)`
  flex: 1;
`;
export const StyledKeyboardContainer = styled(KeyboardAvoidingView)`
  flex: 1;
`;
export const StyledGradientContainer = styled(LinearGradient)<{
  headerHeight: string;
}>`
  flex: 1;
  padding-top: ${props => props.headerHeight};
`;
