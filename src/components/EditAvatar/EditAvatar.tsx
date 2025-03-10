import {LocalSvg} from 'react-native-svg';
import {Box} from '../Box';
import {StyledEditSquare, StyledImage} from './EditAvatar.styles';
import type {ImageSourcePropType} from 'react-native';

interface IEditAvatarProps {
  source: ImageSourcePropType;
}
const EditAvatar = ({source}: IEditAvatarProps) => (
  <Box>
    <StyledImage source={source} />
    <StyledEditSquare bgColor={'pink'} p={'5px'} br={'br20'}>
      <LocalSvg asset={require('../../assets/icons/EditSquare.svg')} />
    </StyledEditSquare>
  </Box>
);
export default EditAvatar;
