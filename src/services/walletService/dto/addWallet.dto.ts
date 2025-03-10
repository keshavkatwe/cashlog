export interface AddWalletRequestDto {
  accountName: string;
  description?: string;
  lastFourDigit?: string;
  walletTypeId: number;
}
