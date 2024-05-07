import { useAppDispatch } from '@/stores/hooks';
import {
  fetchAccountInfo,
  fetchAllOrders,
  fetchOrderList,
  getQuickStart,
} from '@/stores/states/l2services/actions';
import { batch } from 'react-redux';

export const useFetchUserData = () => {
  const dispatch = useAppDispatch();
  // const isAuthenticated = useIsAuthenticated();
  const isAuthenticated = false;

  const fetchData = () => {
    if (!isAuthenticated) {
      dispatch(fetchAllOrders());
      return;
    }
    batch(() => {
      dispatch(fetchOrderList());
      dispatch(fetchAllOrders());
      dispatch(fetchAccountInfo());
      dispatch(getQuickStart());
    });
  };

  return fetchData;
};
