import dayjs from 'dayjs';

export const getFormattedDisplayDate = (date: Date) => {
  const diff = dayjs().diff(dayjs(date).startOf('day'), 'days');
  if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Yesterday';
  }
  return dayjs(date).format('MMM DD, YYYY');
};
