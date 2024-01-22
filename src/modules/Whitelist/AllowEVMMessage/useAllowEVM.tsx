import React from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { commonSelector } from '@/stores/states/common/selector';
import { getAllowEVMStatus } from '@/services/whitelist';
import AuthenStorage from '@/utils/storage/authen.storage';
import { setAllowEVM } from '@/stores/states/user/reducer';
import { IAllowEVMProps } from '@/modules/Whitelist/AllowEVMMessage/type';
import { getEVMNetworkByFieldType } from '@/modules/Whitelist/utils';

let interval: any = undefined;

const useAllowEVM = ({ type }: IAllowEVMProps) => {
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      const response  = await getAllowEVMStatus(getEVMNetworkByFieldType(type));
      dispatch(setAllowEVM({
        status: response || [],
        loaded: true,
        actionType: type
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

export default useAllowEVM;
