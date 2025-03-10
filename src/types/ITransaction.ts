import type ICategory from './ICategory';
import type ICurrency from './ICurrency';
import type IWallet from './IWallet';

interface ITransaction {
  transactionId: number;
  amount: number;
  note: string;
  dateTime: Date;
  wallet: IWallet;
  currency: ICurrency;
  category: ICategory;
  merchantName: string;
}
export default ITransaction;
