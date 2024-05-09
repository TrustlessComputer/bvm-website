import React from 'react';
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {commonSelector} from "@/store/states/common/selector";
import AuthenStorage from "@/storage/authen.storage";
import {setHoldingBTC} from "@/store/states/user/reducer";
import CLaunchpadAPI from "@/services/api/launchpad";
import {useLaunchpadContext} from "@/providers/LaunchpadProvider/hooks/useLaunchpadContext";

let interval: any = undefined;
const useHoldingBTC = () => {
  const needReload = useAppSelector(commonSelector).needReload;
  const dispatch = useAppDispatch();
  const launchpadApi = new CLaunchpadAPI();
  const { currentLaunchpad } = useLaunchpadContext();

  const fetchData = async () => {
    try {
      const response  = await launchpadApi.getAllowBTCStatus(
        {
          launchpad_id: currentLaunchpad?.id as number,
          network: 'naka',
          type: 'portfolio'
        }
      );
      dispatch(setHoldingBTC({
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

export default useHoldingBTC;
