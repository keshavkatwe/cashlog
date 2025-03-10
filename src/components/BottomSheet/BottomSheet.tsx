import type {PropsWithChildren} from 'react';
import {
  bottomSheetStyles,
  StyledBlur,
  StyledContainer,
  StyledContent,
  StyledOverlay,
} from './BottomSheet.styles';
import {SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import {Box} from '../Box';

export interface IBottomSheetProps {
  onOverlayTap?: () => void;
}
const BottomSheet = ({
  children,
  onOverlayTap,
}: PropsWithChildren<IBottomSheetProps>) => (
  <StyledContainer>
    <StyledBlur blurAmount={2} blurType="dark" />
    <TouchableWithoutFeedback onPress={() => onOverlayTap?.()}>
      <StyledOverlay />
    </TouchableWithoutFeedback>
    <StyledContent behavior={'position'} style={bottomSheetStyles.content}>
      <Box bgColor={'backgroundGradient1'}>
        <SafeAreaView>{children}</SafeAreaView>
      </Box>
    </StyledContent>
  </StyledContainer>
);
export default BottomSheet;
