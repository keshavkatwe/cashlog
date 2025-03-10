import {Box} from '../Box';
import {Typography} from '../Typography';
import {Avatar} from '../Avatar';
import type {ImageSourcePropType} from 'react-native';
import {TouchableOpacity} from 'react-native';

interface IHomeProfileProps {
  preTitle: string;
  title?: string;
  avatarSource?: ImageSourcePropType;
  onAvatarPress?: () => void;
}
const HomeProfile = ({
  preTitle,
  title,
  avatarSource,
  onAvatarPress,
}: IHomeProfileProps) => (
  <Box flexDir={'row'} alignItems={'center'}>
    <Box flex={1}>
      <Typography variant={'bodySmall'}>{preTitle},</Typography>
      <Typography variant={'h2'}>{title}</Typography>
    </Box>
    {avatarSource && (
      <TouchableOpacity onPress={onAvatarPress}>
        <Avatar source={avatarSource} />
      </TouchableOpacity>
    )}
  </Box>
);

export default HomeProfile;
