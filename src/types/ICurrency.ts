import type ICurrencyCode from './ICurrencyCode';

interface ICurrency {
  currencyId: number;
  label: string;
  code: ICurrencyCode;
  countryLabel: string;
  createdAt: Date;
  updatedAt: Date;
}

export default ICurrency;
