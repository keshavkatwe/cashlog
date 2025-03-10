import {HomeProfile} from '../../components';
import {useAppSelector} from '../../store';
import {getGreetingByTime, getSentenceCase} from '../../helpers/textHelper';
import {useMemo} from 'react';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';

const HomeProfileWidget = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {user} = useAppSelector(state => state.user);

  const greet = useMemo(() => getGreetingByTime(), []);
  const firstName = useMemo(
    () => user?.firstName && getSentenceCase(user?.firstName),
    [user?.firstName],
  );
  const defaultPicture = useMemo(
    () => require('../../assets/images/avatar.png'),
    [],
  );

  return (
    <HomeProfile
      title={firstName}
      preTitle={greet}
      avatarSource={
        user?.profilePictureUrl ? {uri: user.profilePictureUrl} : defaultPicture
      }
      onAvatarPress={() => navigation.navigate('Profile')}
    />
  );
};
export default HomeProfileWidget;
