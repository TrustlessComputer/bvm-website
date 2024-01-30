import React from 'react';
import { useAppSelector } from '@/stores/hooks';
import { daySecondSelector } from '@/stores/states/activities/selector';

const useTradeNakaData = () => {
  const { topWinners, bestPNL } = useAppSelector(daySecondSelector);
  console.log('SANG TEST: ', bestPNL);

  return {
    topWinners,
    bestPNL
  }
};


export default useTradeNakaData;
