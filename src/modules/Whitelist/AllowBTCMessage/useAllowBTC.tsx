import React from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { getAllowBTCStatus } from '@/services/whitelist';
import AuthenStorage from '@/utils/storage/authen.storage';
import { setAllowBTC } from '@/stores/states/user/reducer';

let interval: any = undefined;
const useAllowBTC = () => {
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response  = await getAllowBTCStatus();
      dispatch(setAllowBTC({
        status: response || [],
        loaded: true
      }))
    } catch (error) {
      console.log('ERROR: ', error);
    }
  }

  React.useEffect(() => {
    const authenKey = AuthenStorage.getAuthenKey();

    if (!authenKey) return;
    if (interval) {
      clearInterval(interval);
      interval = undefined
    }

    fetchData();
    interval = setInterval(() => {
      fetchData();
    }, 10000)
  }, [needReload]);
}

export default useAllowBTC;
