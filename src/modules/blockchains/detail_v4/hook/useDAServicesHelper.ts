import { useAppDispatch } from '@/stores/hooks';
import { fetchIssueTokenListByChainID } from '@/stores/states/daServices/actions';
import { useMemo, useRef } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';
import { isEmpty } from 'lodash';

const TIMER_INTERVAL = 10000; //10s

export const useDAServicesHelper = () => {
  const dispatch = useAppDispatch();
  const { order, isUpdateFlow, tokenIssueList } = useChainProvider();

  //
  const timerRef = useRef<any>();

  const clearLoopFetchTokenIssueList = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const loopFetchTokenIssueList = (chainID: number | string) => {
    clearLoopFetchTokenIssueList();
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        dispatch(fetchIssueTokenListByChainID(chainID));
      }, TIMER_INTERVAL);
    }
  };

  //
  const isEmptyIssueTokenList = useMemo(() => {
    // return !tokenIssueList || isEmpty(tokenIssueList);
    return true;
  }, [tokenIssueList]);

  // RESULT
  const result = {
    tokenIssueList,
    isEmptyIssueTokenList,

    loopFetchTokenIssueList,
    clearLoopFetchTokenIssueList,
  };

  // console.log('[useDAServicesHelper] -- ALl Data ', result);

  return result;
};
