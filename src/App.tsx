import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import navigationTheme from './themes/navigationTheme';
import darkTheme from './themes/darkTheme';
import {ThemeProvider} from 'styled-components/native';
import {StatusBar} from 'react-native';
import {AlertProvider} from './plugins/Alert';
import {Provider} from 'react-redux';
import {store} from './store';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import * as Sentry from '@sentry/react-native';
import {useRef} from 'react';
import analytics from '@react-native-firebase/analytics';
import NavigationWrapper from './NavigationWrapper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import './helpers/notifeeHelper';

Sentry.init({
  dsn: 'dsn',
  attachScreenshot: true,
  tracesSampleRate: 1.0,
  enabled: !__DEV__,
  _experiments: {
    profilesSampleRate: 1.0,
  },
});
GoogleSignin.configure({
  webClientId:
    'webClientId',
});

dayjs.extend(calendar);

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <NavigationContainer
            theme={navigationTheme}
            ref={navigationRef}
            onReady={() => {
              routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
              const previousRouteName = routeNameRef.current;
              const currentRouteName = navigationRef?.getCurrentRoute()?.name;
              const trackScreenView = async (routeName: string | undefined) => {
                await analytics().logScreenView({
                  screen_name: routeName,
                  screen_class: routeName,
                });
              };

              if (previousRouteName !== currentRouteName) {
                // Save the current route name for later comparison
                routeNameRef.current = currentRouteName;

                // Replace the line below to add the tracker from a mobile analytics SDK
                await trackScreenView(currentRouteName);
              }
            }}>
            <AlertProvider>
              <NavigationWrapper />
            </AlertProvider>
          </NavigationContainer>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default Sentry.wrap(App);
