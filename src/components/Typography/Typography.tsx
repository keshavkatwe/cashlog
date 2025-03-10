import {StyledText} from './Typography.styles';
import type {DefaultTheme} from 'styled-components/native';
import type {TextProps} from 'react-native';
import type {ITypographyVariants} from './Typography.types';

interface ITypographyProps extends TextProps {
  variant?: keyof DefaultTheme['typography'];
  color?: keyof DefaultTheme['colors'];
  align?: ITypographyVariants;
}
const Typography = ({
  variant = 'body',
  color = 'light',
  ...otherProps
}: ITypographyProps) => (
  <StyledText {...otherProps} variant={variant} color={color} />
);
export default Typography;
