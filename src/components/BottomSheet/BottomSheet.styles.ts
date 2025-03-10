import styled from 'styled-components/native';
import {Box} from '../Box';
import {StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';

export const StyledContainer = styled(Box)`
  flex: 1;
  position: relative;
`;
export const StyledOverlay = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const StyledContent = styled.KeyboardAvoidingView`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

export const bottomSheetStyles = StyleSheet.create({
  content: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 9.11,
    elevation: 14,
  },
  contentContainerStyle: {
    flex: 1,
  },
});

export const StyledBlur = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;
