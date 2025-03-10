import {StyledImage} from './Avatar.styles';
import type {ImageSourcePropType} from 'react-native';

interface IAvatarProps {
  source: ImageSourcePropType;
}
const Avatar = ({source}: IAvatarProps) => <StyledImage source={source} />;
export default Avatar;
