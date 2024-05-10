import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { setAllowSAVM } from '@/stores/states/user/reducer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

let interval: any = undefined;
const useAllowSAVM = () => {
  const needReload = useSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const { currentLaunchpad } = useLaunchpadContext();
  const { isAuthen } = useNakaAuthen();

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
  }, [needReload, isAuthen]);
};

export default useAllowSAVM;
