import {Box, MainContainer, Typography} from '../../components';
import {StyledLottie} from './SplashError.styles';
import {TouchableOpacity} from 'react-native';
import {useCallback} from 'react';
import {fetchStartUp} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../store';

const SplashError = () => {
  const dispatch = useAppDispatch();
  const triggerStartUp = useCallback(() => {
    dispatch(fetchStartUp());
  }, [dispatch]);
  return (
    <MainContainer>
      <Box flex={1} justifyContent={'center'}>
        <Box pb={'12px'}>
          <StyledLottie
            autoPlay
            loop
            source={require('../../assets/lottie/SomethingWrong.json')}
            resizeMode={'cover'}
          />
        </Box>
        <Box ph={'16px'}>
          <Typography
            variant={'blockquote'}
            color={'purpleLightest'}
            align={'center'}>
            An unexpected error occurred. Please try again later.
          </Typography>
        </Box>
        <Box alignItems={'center'}>
          <TouchableOpacity onPress={triggerStartUp}>
            <Box p={'20px'}>
              <Typography color={'placeholder'} variant={'h6'}>
                Retry
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default SplashError;
