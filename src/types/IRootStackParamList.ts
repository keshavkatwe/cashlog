import type ITransaction from './ITransaction';
import type IWallet from './IWallet';

type IRootStackParamList = {
  IntroPage: undefined;
  LoginEmailPage: undefined;
  ValidatePasswordPage?: {email?: string};
  ValidateOtpPage: {
    uniqueRequestId?: string;
    email?: string;
    backNavigate?: 'ResetPassword';
    isNewUser?: boolean;
  };
  ResetPassword: {uniqueRequestId: string; otp: string};
  BasicInfoPage?: {uniqueRequestId?: string};
  HomeTabs: undefined;
  ManageTransaction?: {
    transaction?: ITransaction;
    selectedCurrencyId?: number;
    backNavigate?: keyof IRootStackParamList;
  };
  SplashLoading: undefined;
  SplashError: undefined;
  ManageWallet: {
    walletTypeId?: number;
    wallet?: IWallet;
  };
  EditProfile: undefined;
  UserSettings?: {selectedCurrencyId?: number};
  CategoryAnalytics: undefined;
  MessagesPage: undefined;
  Transactions: undefined;
  Profile: undefined;
  SelectCurrency: {
    backNavigate: keyof IRootStackParamList;
  };
  Transaction: {
    transaction: ITransaction;
  };
  HelpSupport: undefined;
};
export default IRootStackParamList;
