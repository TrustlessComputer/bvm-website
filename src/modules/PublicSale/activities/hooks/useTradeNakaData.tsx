import React from 'react';
import { useAppSelector } from '@/stores/hooks';
import { daySecondSelector } from '@/stores/states/activities/selector';

const useTradeNakaData = () => {
  const { topWinners } = useAppSelector(daySecondSelector);

  return {
    topWinners,
  }
};


export default useTradeNakaData;
