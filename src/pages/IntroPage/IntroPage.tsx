import {Box, Button, MainContainer, Typography} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {Image} from 'react-native';

const IntroPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<IRootStackParamList>>();
  return (
    <MainContainer>
      <Box
        flex={1}
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}>
        <Box flex={1} alignItems={'center'}>
          <Image
            source={require('../../assets/images/onboarding-step-1.png')}
          />
          <Box flex={1}>
            <Typography variant={'h2'} align={'center'}>
              Welcome to CashLog!
            </Typography>
            <Box mt={'10px'}>
              <Typography color={'grey'}>
                Track and Manage Your Expenses Effortlessly
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button onPress={() => navigation.navigate('LoginEmailPage')}>
          Continue
        </Button>
      </Box>
    </MainContainer>
  );
};
export default IntroPage;
