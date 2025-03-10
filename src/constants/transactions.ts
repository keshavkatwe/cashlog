import dayjs from 'dayjs';
import type IDateRangeType from '../types/IDateRangeType';

export const dateRangeValues: Record<
  IDateRangeType,
  [dayjs.Dayjs, dayjs.Dayjs]
> = {
  CURRENT_MONTH: [dayjs().startOf('month'), dayjs().endOf('day')],
  LAST_MONTH: [
    dayjs().subtract(1, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
  LAST_3MONTH: [
    dayjs().subtract(3, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
  LAST_6MONTH: [
    dayjs().subtract(6, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
  CURRENT_YEAR: [dayjs().startOf('year'), dayjs().endOf('day')],
  LAST_YEAR: [
    dayjs().subtract(1, 'year').startOf('year'),
    dayjs().subtract(1, 'year').endOf('year'),
  ],
  LAST_3YEARS: [
    dayjs().subtract(3, 'year').startOf('year'),
    dayjs().subtract(1, 'year').endOf('year'),
  ],
};

export const dateRangeLabels: Record<IDateRangeType, string> = {
  CURRENT_MONTH: 'Current month',
  LAST_MONTH: 'Last month',
  LAST_3MONTH: 'Last 3 months',
  LAST_6MONTH: 'Last 6 months',
  CURRENT_YEAR: 'Current year',
  LAST_YEAR: 'Last year',
  LAST_3YEARS: 'Last 3 years',
};
