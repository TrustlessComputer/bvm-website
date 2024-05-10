import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { setStakingBVM } from '@/stores/states/user/reducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let interval: any = undefined;
const useAllowStaking = () => {
  const needReload = useSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const { currentLaunchpad } = useLaunchpadContext();

  const fetchData = async () => {
    try {
      const response = await launchpadApi.getAllowBTCStatus({
        launchpad_id: currentLaunchpad?.id as number,
        network: 'naka',
        type: 'staking',
      });
      dispatch(
        setStakingBVM({
          status: response || [],
          loaded: true,
        }),
      );
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  React.useEffect(() => {
    // const authenKey = AuthenStorage.getAuthenKey();
    //
    // if (!authenKey) return;
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

export default useAllowStaking;
