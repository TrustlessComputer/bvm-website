import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import CPaymentAPI from '@/modules/Launchpad/services/payment';
import {
  setPublicSaleSummary,
  setUserContributeInfo,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { LaunchpadContext } from '@/Providers/LaunchpadProvider';
import throttle from 'lodash/throttle';
import React, { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';

const useFetchPayment = () => {
  const { currentLaunchpad } = useContext(LaunchpadContext);
  const cpaymentAPI = useRef(new CPaymentAPI()).current;
  const wallet = useNakaAuthen();
  const dispatch = useDispatch();

  const address = wallet?.nakaAddress;

  const [counter, setCounter] = React.useState(0);

  const getUserContributeInfo = async (address?: string) => {
    if (!address) return;
    const { data } = await cpaymentAPI.getPublicSaleLeaderBoards(
      {
        page: 1,
        limit: 0,
      },
      currentLaunchpad?.id as number,
    );

    if (data[0]?.need_active) {
      const contribute = data[0] as ILeaderBoardEAI;
      dispatch(setUserContributeInfo(contribute));
    }
  };

  const fetchDepositAddress = async (address: string) => {
    // const [depositExternal, depositNaka] = (await Promise.all([
    //   await cpaymentAPI.getPublicSaleWalletInfo(currentLaunchpad?.id),
    //   await cpaymentAPI.getDepositNaka(),
    // ])) as [WalletTokenDeposit[], WalletTokenDeposit[]];
    // if (depositExternal && depositNaka) {
    //   dispatch(
    //     setWalletDeposit({
    //       address: address,
    //       depositExternal,
    //       depositNaka,
    //     }),
    //   );
    // }
  };

  const getSummary = async () => {
    try {
      if (currentLaunchpad?.id) {
        const summary = await cpaymentAPI.getSummary(currentLaunchpad?.id);
        if (summary) {
          dispatch(setPublicSaleSummary(summary));
        }
      }
    } catch (error) {}
  };

  const thGetSummary = React.useCallback(throttle(getSummary, 500), []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter((value: number) => value + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!address || !currentLaunchpad?.id) return;
    fetchDepositAddress(address);
  }, [address, currentLaunchpad]);

  React.useEffect(() => {
    if (currentLaunchpad?.id) {
      thGetSummary();
      getUserContributeInfo(address);
    }
  }, [address, counter, currentLaunchpad]);
};

export default useFetchPayment;
