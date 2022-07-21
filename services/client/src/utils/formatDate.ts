import { DateTime } from 'luxon';

export const formatDate = (date: Date): string | undefined => {
  if (!date) {
    return;
  }
  return DateTime.fromJSDate(new Date(date)).toFormat('MMM dd, yyyy');
};
