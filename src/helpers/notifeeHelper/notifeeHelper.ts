import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {
  // const {notification, pressAction} = detail;
  console.log(type, detail);
});
