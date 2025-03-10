import ReactNativeBiometrics from 'react-native-biometrics';
import {getFromStorage, setToStorage} from './localStorage';

export const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const enableAppLock = async (isEnabled: boolean) => {
  if (isEnabled) {
    try {
      const {success} = await rnBiometrics.simplePrompt({
        promptMessage: 'Verify fingerprint for setup',
      });
      if (!success) {
        return await Promise.reject();
      }
    } catch (e) {
      return Promise.reject(e);
    }
  }

  await setToStorage('lockApp', JSON.stringify(isEnabled));
};

const getAppLocked = async () => {
  const isLockAppEnabledRaw = await getFromStorage('lockApp');
  if (isLockAppEnabledRaw) {
    return JSON.parse(isLockAppEnabledRaw);
  }
  return false;
};

export default {
  rnBiometrics,
  enableAppLock,
  getAppLocked,
};
