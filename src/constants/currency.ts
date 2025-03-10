import type ICurrencyCode from '../types/ICurrencyCode';
import inFlag from '../assets/icons/inFlag.svg';
import arFlag from '../assets/icons/aeFlag.svg';
import usFlagIcon from '../assets/icons/usFlagIcon.svg';

export const currencyFlag: Record<ICurrencyCode, string> = {
  inr: inFlag,
  aed: arFlag,
  usd: usFlagIcon,
};
