import type IWalletTypeCode from './IWalletTypeCode';

interface IWalletType {
  walletTypeId: number;
  label: string;
  code: IWalletTypeCode;
}
export default IWalletType;
