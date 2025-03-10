export interface ISaveTransactionRequestDto {
  amount: number;
  currencyId: number;
  categoryId: number;
  note?: string;
  dateTime: Date;
  walletId: number;
  merchantName: string;
}
