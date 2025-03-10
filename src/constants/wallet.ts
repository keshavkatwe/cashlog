import type IWalletTypeCode from '../types/IWalletTypeCode';
import type {ImageSourcePropType} from 'react-native';

export const walletTypeIcon: Record<IWalletTypeCode, ImageSourcePropType> = {
  BASE_WALLET: require('../assets/images/cash.png'),
  E_WALLET: require('../assets/images/eWallet.png'),
  CREDIT_CARD: require('../assets/images/creditCard.png'),
  BACK_ACCOUNT: require('../assets/images/backAccount.png'),
};
