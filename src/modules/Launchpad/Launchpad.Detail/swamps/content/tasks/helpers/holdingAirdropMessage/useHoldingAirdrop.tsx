import CLaunchpadAPI from '@/modules/Launchpad/services/launchpad';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useLaunchpadContext } from '@/Providers/LaunchpadProvider/hooks/useLaunchpadContext';
import { commonSelector } from '@/stores/states/common/selector';
import {
  setHoldingSWPL2,
  setHoldingSWPSRC20,
} from '@/stores/states/user/reducer';
import { compareString } from '@/utils/string';
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
      const response = await launchpadApi.getAllowBTCStatus({
        launchpad_id: currentLaunchpad?.id as number,
        network: '',
        type: 'src20,swamps',
      });

      dispatch(
        setHoldingSWPL2({
          status:
            response?.filter((v) => compareString(v.point_type, 'swamps')) ||
            {},
          loaded: true,
        }),
      );
      dispatch(
        setHoldingSWPSRC20({
          status:
            response?.filter((v) => compareString(v.point_type, 'src20')) || {},
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
