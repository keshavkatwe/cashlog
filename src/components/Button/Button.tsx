import type {TouchableOpacityProps} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components/native';
import {Typography} from '../Typography';
import type {IButtonSizes, IButtonVariants} from './Button.types';
import type {PropsWithChildren} from 'react';
import {
  StyledGradientButton,
  StyledLottie,
  StyledSolidButton,
  textSizes,
} from './Button.styles';

interface IButtonProps extends TouchableOpacityProps {
  variant?: IButtonVariants;
  size?: IButtonSizes;
  isLoading?: boolean;
}
const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  size = 'normal',
  isLoading,
  ...otherProps
}: PropsWithChildren<IButtonProps>) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity {...otherProps} disabled={isLoading || disabled}>
      {variant === 'primary' && (
        <StyledGradientButton
          start={{x: 0.0, y: 0.2}}
          end={{x: 1.1, y: 0.1}}
          colors={[colors.purpleGradient2, colors.purpleGradient1]}
          isDisabled={disabled}
          size={size}>
          {isLoading ? (
            <StyledLottie
              source={require('../../assets/lottie/ballsSpinner.json')}
              autoPlay
              loop
            />
          ) : (
            <Typography variant={textSizes[size]}>{children}</Typography>
          )}
        </StyledGradientButton>
      )}
      {variant === 'secondary' && (
        <StyledSolidButton isDisabled={isLoading || disabled} size={size}>
          <Typography variant={textSizes[size]}>{children}</Typography>
        </StyledSolidButton>
      )}
    </TouchableOpacity>
  );
};
export default Button;
