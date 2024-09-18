import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchIssueTokenListByChainID } from '@/stores/states/daServices/actions';
import { useMemo, useRef } from 'react';
import { useChainProvider } from '../provider/ChainProvider.hook';
import { isEmpty } from 'lodash';
import { getIsssueTokenListSelector } from '@/stores/states/daServices/selector';

const TIMER_INTERVAL = 10000; //10s

export const useDAServicesHelper = () => {
  const dispatch = useAppDispatch();
  const { order, isUpdateFlow } = useChainProvider();
  const tokenIssueList = useAppSelector(getIsssueTokenListSelector);

  //
  const timerRef = useRef<any>();

  const clearLoopFetchTokenIssueList = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const loopFetchTokenIssueList = (chainID: number | string) => {
    clearLoopFetchTokenIssueList();
    if (!timerRef.current) {
      dispatch(fetchIssueTokenListByChainID(chainID));
      timerRef.current = setInterval(() => {
        dispatch(fetchIssueTokenListByChainID(chainID));
      }, TIMER_INTERVAL);
    }
  };

  //
  const isEmptyIssueTokenList = useMemo(() => {
    return !tokenIssueList || isEmpty(tokenIssueList);
  }, [tokenIssueList]);

  // RESULT
  const result = {
    tokenIssueList,
    isEmptyIssueTokenList,

    loopFetchTokenIssueList,
    clearLoopFetchTokenIssueList,
  };

  console.log('[useDAServicesHelper] -- ALl Data ', result);

  return result;
};
