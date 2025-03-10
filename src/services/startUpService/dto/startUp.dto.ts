import type IUser from '../../../types/IUser';
import type IWallet from '../../../types/IWallet';
import type ICategory from '../../../types/ICategory';
import type IWalletType from '../../../types/IWalletType';
import type ITransaction from '../../../types/ITransaction';
import type IWalletAgre from '../../../types/IWalletAgre';
import type ICurrency from '../../../types/ICurrency';

export interface StartUpDtoResponse {
  userProfile: IUser;
  userWallets?: IWallet[];
  categories?: ICategory[];
  walletTypes?: IWalletType[];
  recentUserTransactions?: ITransaction[];
  sumOfTodayTransactions?: number;
  monthlySpentAmountPerWallet?: {
    aggregation?: IWalletAgre;
  };
  userSettings: {
    currency: ICurrency;
  };
  currencies: ICurrency[];
}
