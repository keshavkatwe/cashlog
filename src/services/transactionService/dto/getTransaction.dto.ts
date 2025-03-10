import type ITransaction from '../../../types/ITransaction';

export interface IGetTransactionRequestDto {
  fromDate: string;
  toDate: string;
  skip: number;
  take: number;
  isGiveTotalSpent?: boolean;
  isGiveGraph?: boolean;
  categoryIds?: string;
}
export interface IGetTransactionResponseDto {
  transactions: ITransaction[];
  sumOfTransaction: number;
  graphData: {
    graphPeriod: string;
    periodData: {
      amount: string;
      dateTime: string;
    }[];
  };
}
