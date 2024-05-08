import useL2ServiceAuth from '@/hooks/useL2ServiceAuth';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import {
  fetchAccountInfo,
  fetchAllOrders,
  fetchOrderList,
  getQuickStart,
} from '@/stores/states/l2services/actions';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import { useEffect, useRef } from 'react';
import { batch } from 'react-redux';

const TIMER_INTERVAL = 10000; //10s

export const useFetchUserData = () => {
  const dispatch = useAppDispatch();
  // const isAuthenticated = useIsAuthenticated();

  const timerRef = useRef<any>();

  const {
    isL2ServiceLogged,
    isNeededRequestSignMessageFromNakaWallet,
    onVerify,
  } = useL2ServiceAuth();
  const nakaAddress = useAppSelector(nakaAddressSelector);

  // const { onSuccess } = prop

  const fetchData = () => {
    if (!isL2ServiceLogged) {
      dispatch(fetchAllOrders());
      return;
    }

    batch(() => {
      dispatch(fetchOrderList());
      dispatch(fetchAllOrders());
      dispatch(getQuickStart());
    });
  };

  const fetchAccountInforHandler = async () => {
    if (isL2ServiceLogged) {
      dispatch(fetchAccountInfo());
    }
  };

  useEffect(() => {
    fetchAccountInforHandler();
    if (!timerRef.current && isL2ServiceLogged) {
      timerRef.current = setInterval(() => {
        fetchAccountInforHandler();
      }, TIMER_INTERVAL);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    };
  }, [isL2ServiceLogged]);

  useEffect(() => {
    onVerify(nakaAddress);
  }, [nakaAddress]);

  useEffect(() => {
    fetchData();
  }, [isL2ServiceLogged]);

  return fetchData;
};
