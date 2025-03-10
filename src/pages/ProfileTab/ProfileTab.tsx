import {
  Box,
  InputContainer,
  MainContainer,
  PickerInputBox,
  TabContainerSpacing,
  Typography,
} from '../../components';
import {useCallback} from 'react';
import {ProfileHeaderWidget} from '../../widgets/ProfileHeaderWidget';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {LocalSvg} from 'react-native-svg';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {useTheme} from 'styled-components/native';
import {Linking} from 'react-native';
import VersionInfo from 'react-native-version-info';
import useStartUp from '../../hooks/useStartUp';

const ProfileTab = () => {
  const {colors} = useTheme();
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const {signOut} = useStartUp();

  const openPrivacy = useCallback(async () => {
    const url = 'https://cashlog.in/privacyPolicy';
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        toolbarColor: colors.backgroundGradient1,
        enableDefaultShare: false,
      });
    } else {
      await Linking.openURL(url);
    }
  }, [colors.backgroundGradient1]);

  // const reviewInStore = useCallback(async () => {
  //   try {
  //     if (InAppReview.isAvailable()) {
  //       await InAppReview.RequestInAppReview();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  return (
    <MainContainer>
      <Box flex={1} pt={'10px'}>
        <ProfileHeaderWidget />
        <Box p={DEFAULT_CONTAINER_PADDING}>
          <InputContainer>
            <PickerInputBox
              displayValue={'Settings'}
              preIcon={
                <LocalSvg asset={require('../../assets/icons/Setting.svg')} />
              }
              onClick={() => navigation.navigate('UserSettings')}
            />
            <PickerInputBox
              displayValue={'Help & Support'}
              preIcon={
                <LocalSvg asset={require('../../assets/icons/User2.svg')} />
              }
              onClick={() => navigation.navigate('HelpSupport')}
            />
            <PickerInputBox
              displayValue={'Privacy'}
              onClick={openPrivacy}
              preIcon={
                <LocalSvg asset={require('../../assets/icons/Lock.svg')} />
              }
            />
          </InputContainer>
          {/*<Box pt={'27px'}>*/}
          {/*  <InputContainer>*/}
          {/*    <PickerInputBox*/}
          {/*      displayValue={'About'}*/}
          {/*      preIcon={*/}
          {/*        <LocalSvg asset={require('../../assets/icons/About.svg')} />*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </InputContainer>*/}
          {/*</Box>*/}
          {/*<Box pt={'27px'}>*/}
          {/*  <InputContainer>*/}
          {/*    <PickerInputBox*/}
          {/*      displayValue={'Rate & Review'}*/}
          {/*      onClick={reviewInStore}*/}
          {/*      preIcon={<SvgXml height={20} width={20} xml={starIcon} />}*/}
          {/*    />*/}
          {/*  </InputContainer>*/}
          {/*</Box>*/}
        </Box>
      </Box>
      <Box p={DEFAULT_CONTAINER_PADDING}>
        <InputContainer>
          <PickerInputBox displayValue={'Sign out'} onClick={signOut} />
        </InputContainer>
        <Box mt={'10px'}>
          <Typography align={'center'} variant={'small'} color={'grey'}>
            App Version: {VersionInfo.appVersion} ({VersionInfo.buildVersion})
          </Typography>
        </Box>
        <TabContainerSpacing />
      </Box>
    </MainContainer>
  );
};

export default ProfileTab;
