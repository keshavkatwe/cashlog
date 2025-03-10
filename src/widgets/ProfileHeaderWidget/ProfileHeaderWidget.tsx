import {Box} from '../../components/Box';
import {Avatar} from '../../components/Avatar';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {Button, Divider, Typography} from '../../components';
import {useAppSelector} from '../../store';
import {getSentenceCase} from '../../helpers/textHelper';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useMemo} from 'react';

const ProfileHeaderWidget = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {user} = useAppSelector(state => state.user);
  const defaultPicture = useMemo(
    () => require('../../assets/images/avatar.png'),
    [],
  );
  return (
    <>
      <Box
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flexDir={'row'}
        alignItems={'center'}>
        <Avatar
          source={
            user?.profilePictureUrl
              ? {uri: user.profilePictureUrl}
              : defaultPicture
          }
        />
        <Box pl={'16px'}>
          <Typography variant={'h6'}>
            {getSentenceCase(user?.firstName || '')}{' '}
            {getSentenceCase(user?.lastName || '')}
          </Typography>
          <Box pt={'4px'}>
            <Button
              size={'tiny'}
              variant={'secondary'}
              onPress={() => navigation.navigate('EditProfile')}>
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
    </>
  );
};
export default ProfileHeaderWidget;
