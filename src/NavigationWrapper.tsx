import {NavHeader} from './components';
import {useMemo} from 'react';
import {useAppSelector} from './store';
import HeaderTitle from './components/NavHeader/HeaderTitle';
import {SplashLoading} from './pages/SplashLoading';
import {BottomTabs} from './pages/BottomTabs';
import {ManageWalletPage} from './pages/ManageWalletPage';
import EditProfile from './pages/EditProfile/EditProfile';
import {UserSettings} from './pages/UserSettings';
import {CategoryAnalyticsPage} from './pages/CategoryAnalyticsPage';
import {TransactionsPage} from './pages/TransactionsPage';
import {MessagesPage} from './pages/MessagesPage';
import {TransactionPage} from './pages/TransactionPage';
import {HelpSupportPage} from './pages/HelpSupportPage';
import {AddTransactionModal} from './pages/ManageTransactionModal';
import {SelectCurrencyModal} from './pages/SelectCurrencyModal';
import {BasicInfoPage} from './pages/BasicInfoPage';
import {IntroPage} from './pages/IntroPage';
import {LoginEmailPage} from './pages/LoginEmailPage';
import {ResetPassword} from './pages/ResetPassword';
import {ValidatePasswordPage} from './pages/ValidatePasswordPage';
import {ValidateOtpPage} from './pages/ValidateOtpPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type IRootStackParamList from './types/IRootStackParamList';
import {SplashError} from './pages/SplashError';

type IBootState = 'SPLASH' | 'LOGIN' | 'HOME' | 'POLICY_PAGE' | 'ERROR';

const Stack = createNativeStackNavigator<IRootStackParamList>();
const NavigationWrapper = () => {
  const userState = useAppSelector(state => state.user);

  const bootState = useMemo((): IBootState => {
    if (userState.startupStatus === 'SUCCESS') {
      if (userState?.user?.onboardingStatus === 'CREATED') {
        return 'POLICY_PAGE';
      }
      if (userState?.user?.onboardingStatus === 'POLICY_TC_ACCEPTED') {
        return 'HOME';
      }
      return 'LOGIN';
    }
    if (userState.startupStatus === 'FAILURE') {
      return 'ERROR';
    }

    return 'SPLASH';
  }, [userState.startupStatus, userState?.user?.onboardingStatus]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        header: NavHeader,
        headerTitle: HeaderTitle,
      }}>
      <>
        {bootState === 'SPLASH' && (
          <Stack.Screen name={'SplashLoading'} component={SplashLoading} />
        )}
        {bootState === 'ERROR' && (
          <Stack.Screen name={'SplashError'} component={SplashError} />
        )}

        {bootState === 'POLICY_PAGE' && (
          <Stack.Screen name={'BasicInfoPage'} component={BasicInfoPage} />
        )}

        {bootState === 'HOME' && (
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
            <Stack.Screen name={'Transaction'} component={TransactionPage} />
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

        {bootState === 'LOGIN' && (
          <>
            <Stack.Screen name={'IntroPage'} component={IntroPage} />
            <Stack.Screen name={'LoginEmailPage'} component={LoginEmailPage} />
            <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
            <Stack.Screen
              name={'ValidatePasswordPage'}
              component={ValidatePasswordPage}
            />
            <Stack.Screen
              name={'ValidateOtpPage'}
              component={ValidateOtpPage}
            />
            <Stack.Screen name={'BasicInfoPage'} component={BasicInfoPage} />
          </>
        )}
      </>
    </Stack.Navigator>
  );
};
export default NavigationWrapper;
