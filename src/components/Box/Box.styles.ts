import type {DefaultTheme} from 'styled-components/native';
import styled, {css} from 'styled-components/native';
import type {
  AlignItems,
  FlexDirection,
  JustifyContent,
  IPosition,
} from './Box.types';

const applyStyle = (property: string, value?: string | number) => {
  if (value) {
    return css`
      ${property}: ${value}
    `;
  }
  return null;
};

export const StyledBox = styled.View<{
  p?: string;
  ph?: string;
  pv?: string;
  pr?: string;
  pl?: string;
  pt?: string;
  pb?: string;
  mr?: string;
  ml?: string;
  m?: string;
  mt?: string;
  mb?: string;
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
}>`
  ${props => applyStyle('padding', props.p)};
  ${props => applyStyle('margin', props.m)};
  ${props => applyStyle('margin-right', props.mr)};
  ${props => applyStyle('margin-left', props.ml)};
  ${props => applyStyle('padding-left', props.ph)};
  ${props => applyStyle('padding-right', props.ph)};
  ${props => applyStyle('padding-top', props.pv)};
  ${props => applyStyle('padding-bottom', props.pv)};
  ${props => applyStyle('flex-direction', props.flexDir)};
  ${props => applyStyle('align-items', props.alignItems)};
  ${props =>
    applyStyle(
      'background-color',
      props.bgColor && props.theme.colors[props.bgColor],
    )};
  ${props => applyStyle('justify-content', props.justifyContent)};
  ${props => applyStyle('flex', props.flex)};
  ${props => applyStyle('padding-left', props.pl)};
  ${props => applyStyle('padding-right', props.pr)};
  ${props => applyStyle('flex-grow', props.flexGrow)};
  ${props => applyStyle('padding-bottom', props.pb)};
  ${props => applyStyle('padding-top', props.pt)};
  ${props =>
    applyStyle(
      'border-radius',
      props.br && props.theme.borderRadius[props.br],
    )};
  ${props => applyStyle('height', props.height)};
  ${props => applyStyle('width', props.width)};
  ${props => applyStyle('position', props.position)};
  ${props => applyStyle('margin-top', props.mt)};
  ${props => applyStyle('margin-bottom', props.mb)};
  ${props => applyStyle('gap', props.gap)};
`;
