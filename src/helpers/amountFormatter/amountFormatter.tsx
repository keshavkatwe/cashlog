import type ICurrencyCode from '../../types/ICurrencyCode';

export const formatAmount = (
  amount: number = 0,
  currencyCode?: ICurrencyCode,
): string => {
  const amountWithComma = (+amount).toLocaleString();

  const currencyMap: Record<ICurrencyCode, string> = {
    aed: `AED ${amountWithComma}`,
    inr: `₹${amountWithComma}`,
    usd: `$${amountWithComma}`,
  };

  return currencyMap[currencyCode || 'inr'];
};
