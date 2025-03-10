import {Box} from '../Box';
import {StyledInput} from './TextInputBox.styles';
import {useTheme} from 'styled-components/native';
import type {TextInputProps} from 'react-native';
import React from 'react';

export interface ITextInputBoxProps extends TextInputProps {
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
}
const TextInputBox = ({
  preIcon,
  postIcon,
  multiline,
  ...otherProps
}: ITextInputBoxProps) => {
  const {colors} = useTheme();
  return (
    <Box flexDir={'row'} alignItems={'center'}>
      {preIcon && (
        <Box width={'20px'} alignItems={'center'} mr={'8px'}>
          {preIcon}
        </Box>
      )}
      <StyledInput
        {...otherProps}
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        isMultiLine={multiline}
      />
      {postIcon && <Box pr={'14px'}>{postIcon}</Box>}
    </Box>
  );
};

export default TextInputBox;
