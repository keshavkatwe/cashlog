import type {PropsWithChildren} from 'react';
import React from 'react';
import type {DefaultTheme} from 'styled-components/native';
import type {ViewProps} from 'react-native';
import {StyledBox} from './Box.styles';
import type {AlignItems, FlexDirection, JustifyContent} from './Box.types';
import type {IPosition} from './Box.types';

interface BoxProps extends ViewProps {
  p?: string;
  ph?: string;
  pv?: string;
  pr?: string;
  pl?: string;
  pt?: string;
  pb?: string;
  mr?: string;
  ml?: string;
  mt?: string;
  mb?: string;
  m?: string;
  flexDir?: FlexDirection;
  alignItems?: AlignItems;
  bgColor?: keyof DefaultTheme['colors'];
  justifyContent?: JustifyContent;
  flex?: number;
  flexGrow?: number;
  br?: keyof DefaultTheme['borderRadius'];
  height?: string;
  width?: string;
  position?: IPosition;
  gap?: string;
}

const Box = ({children, ...otherProps}: PropsWithChildren<BoxProps>) => (
  <StyledBox {...otherProps}>{children}</StyledBox>
);
export default Box;
