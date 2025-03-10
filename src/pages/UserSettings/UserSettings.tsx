import {
  Box,
  InputContainer,
  MainContainer,
  PickerInputBox,
  Switch,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {useCallback, useEffect, useMemo, useState} from 'react';
import type {NavigationProp, RouteProp} from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useAppDispatch, useAppSelector} from '../../store';
import {usePromise} from '../../hooks/usePromise';
import {updateUserSettingsApi} from '../../services/userSettingService/userSettingService';
import {useAlert} from '../../plugins/Alert';
import {setUserSetting} from '../../store/slices/userSettingSlice';
import useStartUp from '../../hooks/useStartUp';
import type IApiException from '../../types/IApiException';
import {Alert, Platform, ToastAndroid} from 'react-native';
import biometricHelper from '../../helpers/biometricHelper';
import {RemindTransactionSettingWidget} from '../../widgets/RemindTransactionSettingWidget';

const UserSettings = () => {
  const {showError, showSuccess} = useAlert();
  const dispatch = useAppDispatch();
  const {updateSpends} = useStartUp();
  const userCurrencyId = useAppSelector(
    state => state.userSetting.settings.currencyId,
  );
  const userCurrencies = useAppSelector(state => state.currencies.currencies);
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();
  const route = useRoute<RouteProp<IRootStackParamList, 'UserSettings'>>();

  const [isAppLock, setIsAppLock] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState(userCurrencyId);

  const {trigger: updateCurrency} = usePromise(
    useCallback(
      async (currencyId: number) => {
        setSelectedCurrencyId(currencyId);
        await updateUserSettingsApi({
          currencyId,
        });

        await updateSpends();
        dispatch(
          setUserSetting({
            settings: {
              currencyId,
            },
          }),
        );
      },
      [dispatch, updateSpends],
    ),
    {
      onError: useCallback(
        (err?: IApiException) => {
          showError('Update currency failed', err?.message);
          setSelectedCurrencyId(userCurrencyId);
        },
        [showError, userCurrencyId],
      ),
    },
  );

  const userCurrency = useMemo(
    () =>
      userCurrencies.find(
        currencyItem => currencyItem.currencyId === selectedCurrencyId,
      ),
    [selectedCurrencyId, userCurrencies],
  );

  const openCurrency = useCallback(() => {
    navigation.navigate('SelectCurrency', {
      backNavigate: 'UserSettings',
    });
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.selectedCurrencyId) {
      updateCurrency(route?.params?.selectedCurrencyId);
    }
  }, [route?.params?.selectedCurrencyId, updateCurrency]);

  const getAppLock = useCallback(async () => {
    const isAppLockEnabled = await biometricHelper.getAppLocked();
    setIsAppLock(isAppLockEnabled);
  }, []);

  useEffect(() => {
    getAppLock().catch(() => {});
  }, [getAppLock]);

  const toggleLockApp = useCallback(
    async (value: boolean) => {
      setIsAppLock(value);
      try {
        await biometricHelper.enableAppLock(value);
        if (value) {
          showSuccess('App lock successful');
        }
      } catch (e) {
        setIsAppLock(!value);
      }
    },
    [showSuccess],
  );

  const changeLanguage = useCallback(() => {
    const message = 'Support for multiple languages is coming soon.';
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message);
    }
  }, []);

  return (
    <MainContainer>
      <Box ph={DEFAULT_CONTAINER_PADDING}>
        <Box>
          <Typography color={'purpleLightest'}>Display</Typography>
          <Box pt={'8px'}>
            <InputContainer>
              <PickerInputBox
                onClick={openCurrency}
                displayValue={'Currency for Total Wallet'}
                rightElement={
                  <Typography color={'purpleLighter'}>
                    {userCurrency?.label}
                  </Typography>
                }
              />
              <PickerInputBox
                onClick={changeLanguage}
                displayValue={'Language'}
                rightElement={
                  <Typography color={'purpleLighter'}>English</Typography>
                }
              />
            </InputContainer>
          </Box>
        </Box>
        <Box pt={'40px'}>
          <Typography color={'purpleLightest'}>System</Typography>
          <Box pt={'8px'}>
            <InputContainer>
              <PickerInputBox
                displayValue={'App Lock'}
                postElement={
                  <Switch
                    onValueChange={value => toggleLockApp(value)}
                    value={isAppLock}
                  />
                }
                isOpacityDisable
              />
              <RemindTransactionSettingWidget />
            </InputContainer>
          </Box>
        </Box>
      </Box>
    </MainContainer>
  );
};
export default UserSettings;
