import {useHideAnimation} from 'react-native-bootsplash';
import {Image, TouchableOpacity, View} from 'react-native';
import {useCallback} from 'react';
import {fetchStartUp} from '../../store/slices/userSlice';
import {useAppDispatch} from '../../store';
import biometricHelper, {rnBiometrics} from '../../helpers/biometricHelper';
import {usePromise} from '../../hooks/usePromise';
import {Box, Button} from '../../components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import touchIdIcon from '../../assets/icons/touchid.svg';
import {SvgXml} from 'react-native-svg';
import {useTheme} from 'styled-components/native';
import {StyledContainer} from './SplashLoading.styles';
import useStartUp from '../../hooks/useStartUp';
const SplashLoading = () => {
  const {colors} = useTheme();
  const dispatch = useAppDispatch();
  const {bottom} = useSafeAreaInsets();
  const {signOut} = useStartUp();
  const {trigger: triggerStartUp, error} = usePromise(
    useCallback(async () => {
      const isAppLockEnabled = await biometricHelper.getAppLocked();
      if (isAppLockEnabled) {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirm authentication',
        });
        if (!success) {
          await Promise.reject();
        }
      }
    }, []),
    {
      onSuccess: useCallback(() => {
        dispatch(fetchStartUp());
      }, [dispatch]),
    },
  );

  const {container, logo /*, brand */} = useHideAnimation({
    manifest: require('../../assets/bootsplash_manifest.json'),
    logo: require('../../assets/bootsplash_logo.png'),

    statusBarTranslucent: false,
    navigationBarTranslucent: false,

    animate: triggerStartUp,
  });

  return (
    <View {...container} style={container.style}>
      <>
        <Image {...logo} style={logo.style} />
        {error && (
          <StyledContainer
            pb={DEFAULT_CONTAINER_PADDING}
            style={{bottom: bottom + 26}}>
            <Box pb={'40px'} alignItems={'center'}>
              <TouchableOpacity onPress={triggerStartUp}>
                <SvgXml
                  xml={touchIdIcon}
                  height={60}
                  width={60}
                  fill={colors.purpleLight}
                />
              </TouchableOpacity>
            </Box>

            <Button variant={'secondary'} size={'small'} onPress={signOut}>
              Sign out
            </Button>
          </StyledContainer>
        )}
      </>
    </View>
  );
};
export default SplashLoading;
