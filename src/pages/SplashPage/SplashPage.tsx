import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {NavHeader} from '../../components';
import {IntroPage} from '../IntroPage';
import {LoginEmailPage} from '../LoginEmailPage';
import {ValidateOtpPage} from '../ValidateOtpPage';
import {ValidatePasswordPage} from '../ValidatePasswordPage';
import {BasicInfoPage} from '../BasicInfoPage';
import {BottomTabs} from '../BottomTabs';
import {AddTransactionModal} from '../ManageTransactionModal';
import {useCallback, useEffect} from 'react';
import {usePromise} from '../../hooks/usePromise';
import {getFromStorage} from '../../helpers/localStorage';
import {useAppSelector} from '../../store';
import RNBootSplash from 'react-native-bootsplash';
import {SplashLoading} from '../SplashLoading';
import useStartUp from '../../hooks/useStartUp';
import {SplashError} from '../SplashError';
import {ManageWalletPage} from '../ManageWalletPage';
import EditProfile from '../EditProfile/EditProfile';
import {UserSettings} from '../UserSettings';
import {CategoryAnalyticsPage} from '../CategoryAnalyticsPage';
import {MessagesPage} from '../MessagesPage';
import HeaderTitle from '../../components/NavHeader/HeaderTitle';
import {TransactionsPage} from '../TransactionsPage';
import {SelectCurrencyModal} from '../SelectCurrencyModal';
import {TransactionPage} from '../TransactionPage';
import {ResetPassword} from '../ResetPassword';
import type IApiException from '../../types/IApiException';
import {HelpSupportPage} from '../HelpSupportPage';

const Stack = createNativeStackNavigator<IRootStackParamList>();
const SplashPage = () => {
  const {setupInitial} = useStartUp();
  const userState = useAppSelector(state => state.user);
  const {trigger, isPageLoading, error} = usePromise(
    useCallback(async () => {
      try {
        const token = await getFromStorage('token');
        if (token) {
          await setupInitial();
        }
      } catch (e) {
        if ((e as IApiException)?.statusCode !== 401) {
          return Promise.reject(e);
        }
      }
    }, [setupInitial]),
    {
      onSuccess: useCallback(() => RNBootSplash.hide(), []),
      onError: useCallback((err?: IApiException) => {
        RNBootSplash.hide().catch();
        console.log(err);
      }, []),
    },
  );

  useEffect(() => {
    trigger({});
  }, [trigger]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        header: NavHeader,
        headerTitle: HeaderTitle,
      }}>
      <>
        {error && <Stack.Screen name={'SplashError'} component={SplashError} />}
        {isPageLoading && !error && (
          <Stack.Screen name={'SplashLoading'} component={SplashLoading} />
        )}
        {!isPageLoading && !error && (
          <>
            {userState.user &&
              userState.user.onboardingStatus === 'POLICY_TC_ACCEPTED' && (
                <>
                  <Stack.Screen
                    name={'HomeTabs'}
                    component={BottomTabs}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name={'ManageWallet'}
                    component={ManageWalletPage}
                    options={{
                      title: 'Add wallet',
                    }}
                  />
                  <Stack.Screen
                    name={'EditProfile'}
                    component={EditProfile}
                    options={{
                      title: 'Profile',
                    }}
                  />
                  <Stack.Screen
                    name={'UserSettings'}
                    component={UserSettings}
                    options={{
                      title: 'Settings',
                    }}
                  />
                  <Stack.Screen
                    name={'CategoryAnalytics'}
                    component={CategoryAnalyticsPage}
                    options={{
                      title: 'Analytics',
                    }}
                  />
                  <Stack.Screen
                    name={'Transactions'}
                    component={TransactionsPage}
                    options={{
                      title: 'Transactions History',
                    }}
                  />
                  <Stack.Screen
                    name={'MessagesPage'}
                    component={MessagesPage}
                    options={{
                      title: 'Messages',
                    }}
                  />
                  <Stack.Screen
                    name={'Transaction'}
                    component={TransactionPage}
                  />
                  <Stack.Screen
                    name={'HelpSupport'}
                    component={HelpSupportPage}
                    options={{
                      title: 'Help & Support',
                    }}
                  />
                  <Stack.Group
                    screenOptions={{
                      headerShown: false,
                      presentation: 'transparentModal',
                      animation: 'slide_from_bottom',
                    }}>
                    <Stack.Screen
                      name={'ManageTransaction'}
                      component={AddTransactionModal}
                    />
                    <Stack.Screen
                      name={'SelectCurrency'}
                      component={SelectCurrencyModal}
                    />
                  </Stack.Group>
                </>
              )}

            {userState?.user?.onboardingStatus === 'CREATED' && (
              <>
                <Stack.Screen
                  name={'BasicInfoPage'}
                  component={BasicInfoPage}
                />
              </>
            )}

            {!userState.user && (
              <>
                <Stack.Screen name={'IntroPage'} component={IntroPage} />
                <Stack.Screen
                  name={'LoginEmailPage'}
                  component={LoginEmailPage}
                />
                <Stack.Screen
                  name={'ResetPassword'}
                  component={ResetPassword}
                />
                <Stack.Screen
                  name={'ValidatePasswordPage'}
                  component={ValidatePasswordPage}
                />
                <Stack.Screen
                  name={'ValidateOtpPage'}
                  component={ValidateOtpPage}
                />
                <Stack.Screen
                  name={'BasicInfoPage'}
                  component={BasicInfoPage}
                />
              </>
            )}
          </>
        )}
      </>
    </Stack.Navigator>
  );
};
export default SplashPage;
