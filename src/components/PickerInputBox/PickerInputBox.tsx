import {Typography} from '../Typography';
import {TouchableOpacity} from 'react-native';
import {StyledContainer} from './PickerInputBox.styles';
import {LineArrowRight} from '../../assets/icons';
import React from 'react';
import {Box} from '../Box';

export interface IPickerInputBoxProps {
  preIcon?: React.ReactNode;
  onClick?: () => void;
  placeholder?: string;
  displayValue?: string;
  postElement?: React.ReactNode;
  isOpacityDisable?: boolean;
  rightElement?: React.ReactNode;
}
const PickerInputBox = ({
  onClick,
  placeholder,
  displayValue,
  preIcon,
  postElement,
  isOpacityDisable,
  rightElement,
}: IPickerInputBoxProps) => (
  <TouchableOpacity
    onPress={onClick}
    activeOpacity={isOpacityDisable ? 1 : 0.2}>
    <Box flexDir={'row'} alignItems={'center'}>
      {preIcon && (
        <Box width={'20px'} alignItems={'center'} mr={'8px'}>
          {preIcon}
        </Box>
      )}
      <StyledContainer
        alignItems={'center'}
        flexDir={'row'}
        justifyContent={'space-between'}
        flex={1}>
        {displayValue ? (
          <Typography>{displayValue}</Typography>
        ) : (
          <Typography color={'placeholder'}>{placeholder}</Typography>
        )}
      </StyledContainer>
      <Box flexDir={'row'}>
        <Box>{rightElement}</Box>
        <Box>{postElement || <LineArrowRight />}</Box>
      </Box>
    </Box>
  </TouchableOpacity>
);

export default PickerInputBox;
