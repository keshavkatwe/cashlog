export interface ManageTransactionFormWidgetFormState {
  transactionId?: number;
  amount: string;
  categoryId: number;
  note?: string;
  transactionDate: Date;
  walletId: number;
  merchantName: string;
  currencyId: number;
}
