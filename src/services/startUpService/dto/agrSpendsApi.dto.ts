import type IWalletAgre from '../../../types/IWalletAgre';

export interface AgrSpendsApiDtoResponse {
  sumOfTodayTransactions: 1;
  monthlySpentAmountPerWallet: {
    aggregation: IWalletAgre;
  };
}
