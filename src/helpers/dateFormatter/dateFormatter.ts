import dayjs from 'dayjs';

export const formatTransactionDate = (val: Date) =>
  dayjs(val).calendar(null, {
    sameDay: '[Today at] h:mm A',
    lastDay: '[Yesterday at] h:mm A',
    lastWeek: 'MMM D, YYYY [at] h:mm A',
    sameElse: 'MMM D, YYYY [at] h:mm A',
  });
