import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import { setHoldingRNDR } from '@/stores/states/user/reducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

let interval: any = undefined;
const useHoldingAirdrop = () => {
  const needReload = useSelector(commonSelector).needReload;
  const dispatch = useDispatch();
  const launchpadApi = useRef(new CLaunchpadAPI()).current;
  const { currentLaunchpad } = useLaunchpadContext();
  const wallet = useAuthenticatedWallet();

  const isAuthenticated = wallet?.address;

  const fetchData = async () => {
    try {
      const response = await launchpadApi.getAirdropStatus({
        launchpad_id: currentLaunchpad?.id as number,
        network: 'ethereum',
        type: 'render',
      });

      dispatch(
        setHoldingRNDR({
          status: response || {},
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

export default useHoldingAirdrop;
