import type {DefaultTheme} from 'styled-components/native';
import styled from 'styled-components/native';
import type {ITypographyVariants} from './Typography.types';
import {fontPixel} from '../../helpers/responsive';

export const StyledText = styled.Text<{
  variant: keyof DefaultTheme['typography'];
  color: keyof DefaultTheme['colors'];
  align?: ITypographyVariants;
}>`
  font-size: ${props =>
    fontPixel(props.theme.typography[props.variant].fontSize)}px;
  font-family: ${props => props.theme.typography[props.variant].fontFamily};
  color: ${props => props.theme.colors[props.color]};
  text-align: ${props => props.align || 'left'};
`;
