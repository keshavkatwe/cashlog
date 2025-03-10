import type {DefaultTheme} from 'styled-components/native';
import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {Box} from '../Box';
import type {IButtonSizes} from './Button.types';
import Lottie from 'lottie-react-native';

const buttonSizes = {
  normal: css`
    height: 64px;
    border-radius: 22px;
  `,
  small: css`
    height: 44px;
    border-radius: 11px;
  `,
  tiny: css`
    height: 32px;
    border-radius: 11px;
  `,
};

export const textSizes: Record<IButtonSizes, keyof DefaultTheme['typography']> =
  {
    tiny: 'lead',
    normal: 'h5',
    small: 'h6',
  };

export const StyledGradientButton = styled(LinearGradient)<{
  isDisabled: boolean;
  size: IButtonSizes;
}>`
  ${props => buttonSizes[props.size]};
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.7;
    `}
`;

export const StyledSolidButton = styled(Box)<{
  isDisabled: boolean;
  size: IButtonSizes;
}>`
  ${props => buttonSizes[props.size]};
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  background-color: ${props => props.theme.colors.purpleLighter};

  ${props =>
    props.isDisabled &&
    css`
      opacity: 0.7;
    `}
`;

export const StyledLottie = styled(Lottie)`
  width: 100%;
  flex: 1;
`;
