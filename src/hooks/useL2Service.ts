import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppDispatch } from '@/stores/hooks';
import {
  fetchAccountInfo,
  fetchAllOrders,
  fetchAllOrdersV2,
  fetchDAList,
  fetchOrderDetailByID,
  fetchOrderList,
  fetchTemplateV2,
  fetchModelCategories,
  fetchAvailableListTemplate,
} from '@/stores/states/l2services/actions';
import { useRef } from 'react';

const TIMER_INTERVAL = 10000; //10s

const useL2Service = () => {
  const timerRef = useRef<any>();

  const clearIntervalTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;
  };

  const { loggedIn } = useWeb3Auth();
  const dispatch = useAppDispatch();

  const getMyOrderList = () => {
    dispatch(fetchOrderList());
  };

  const getAccountInfor = async () => {
    return dispatch(fetchAccountInfo());
  };

  const getAllOrderList = () => {
    dispatch(fetchAllOrders());
  };

  const getAllOrderListV2 = () => {
    dispatch(fetchAllOrdersV2());
  };

  const getDappsList = () => {
    dispatch(fetchDAList());
  };

  const getModelCategories = (tcAddress?: string) => {
    dispatch(fetchModelCategories(tcAddress || ''));
  };

  const getAvailableListTemplate = () => {
    dispatch(fetchAvailableListTemplate());
  };

  const getTemplateV2 = () => {
    dispatch(fetchTemplateV2());
  };

  const getOrderDetailByID = (orderId: string) => {
    dispatch(fetchOrderDetailByID(orderId));
  };

  const loopFetchAccountInfor = () => {
    clearIntervalTimer();
    if (loggedIn) {
      getAccountInfor();
      if (!timerRef.current) {
        timerRef.current = setInterval(() => {
          getAccountInfor();
        }, TIMER_INTERVAL);
      }
    } else {
      clearIntervalTimer();
    }
  };

  return {
    loopFetchAccountInfor,
    getMyOrderList,
    getAccountInfor,
    getAllOrderList,
    getAllOrderListV2,
    getDappsList,
    getTemplateV2,
    getOrderDetailByID,
    getAvailableListTemplate,
    getModelCategories,
  };
};

export default useL2Service;
