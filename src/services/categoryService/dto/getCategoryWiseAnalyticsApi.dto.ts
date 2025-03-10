export interface GetCategoryWiseAnalyticsApiResponseDto {
  totalSumOfTransaction: number;
  analyticsData: {
    sumOfTransactionPerCategory: string;
    categoryId: number;
  }[];
}

export interface GetCategoryWiseAnalyticsApiRequestDto {
  fromDate: string;
  toDate: string;
  walletId?: number;
}
