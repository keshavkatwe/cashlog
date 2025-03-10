import type IWalletType from './IWalletType';

interface IWallet {
  walletId: number;
  accountName: string;
  description: string;
  lastFourDigit: string;
  walletType: IWalletType;
}
export default IWallet;
