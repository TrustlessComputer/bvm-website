import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { commonSelector } from '@/store/states/common/selector';
import { setAllowSAVM } from '@/store/states/user/reducer';
import CLaunchpadAPI from '@/services/api/launchpad';
import { useLaunchpadContext } from '@/providers/LaunchpadProvider/hooks/useLaunchpadContext';
import useAuthen from '@/hooks/useAuthen';

let interval: any = undefined;
const useAllowSAVM = () => {
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const { currentLaunchpad } = useLaunchpadContext();
  const { isAuthenticated } = useAuthen();

  const fetchData = async () => {
    try {
      const response = await launchpadApi.getAllowBTCStatus({
        launchpad_id: currentLaunchpad?.id as number,
        network: 'ethereum',
        type: 'savm',
      });
      dispatch(
        setAllowSAVM({
          status: response || [],
          loaded: true,
        }),
      );
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  React.useEffect(() => {
    // if (!isAuthenticated) return;
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    fetchData();
    interval = setInterval(() => {
      fetchData();
    }, 10000);
  }, [needReload, isAuthenticated]);
};

export default useAllowSAVM;
