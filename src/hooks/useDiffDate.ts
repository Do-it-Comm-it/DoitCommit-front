import { differenceInDays } from 'date-fns';
import { useMemo } from 'react';

const useDiffDate = (date: Date) => {
  const userDate = useMemo(() => new Date(date), [date]);
  return differenceInDays(new Date(), userDate);
};

export default useDiffDate;
