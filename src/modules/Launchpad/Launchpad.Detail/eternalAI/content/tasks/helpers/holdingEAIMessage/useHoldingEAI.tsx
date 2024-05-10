import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { setHoldingEAI } from '@/stores/states/user/reducer';
import AuthenStorage from '@/utils/storage/authen.storage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

let interval: any = undefined;
const useHoldingEAI = () => {
  const needReload = useSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const { currentLaunchpad } = useLaunchpadContext();

  const fetchData = async () => {
    try {
      const response = await launchpadApi.getAllowBTCStatus({
        launchpad_id: currentLaunchpad?.id as number,
        network: 'naka',
        type: 'testnet',
      });
      dispatch(
        setHoldingEAI({
          status: response || [],
          loaded: true,
        }),
      );
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  React.useEffect(() => {
    const authenKey = AuthenStorage.getAuthenKey();

    if (!authenKey) return;
    if (interval) {
      clearInterval(interval);
      interval = undefined;
    }

    fetchData();
    interval = setInterval(() => {
      fetchData();
    }, 10000);
  }, [needReload]);
};

export default useHoldingEAI;
