import React, { useRef } from 'react';
import throttle from 'lodash/throttle';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import { useAuthenticatedWallet } from '@/Providers/AuthenticatedProvider/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import { setPublicSaleSummary, setUserContributeInfo, setWalletDeposit } from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';

const useFetchPaymentEAI = () => {
  const cpaymentEAIAPI = useRef(new CPaymentEAIAPI()).current;
  const wallet = useAuthenticatedWallet();
  const address = wallet?.address;
  const dispatch = useDispatch();
  const needReload = useSelector(commonSelector).needReload;
  // const [counter, setCounter] = React.useState(0);

  const getUserContributeInfo = async (address?: string) => {
    if (!address) return;
    const { data } = await cpaymentEAIAPI.getPublicSaleLeaderBoards({
      page: 1,
      limit: 0,
    });

    if (data[0]?.need_active) {
      const contribute = data[0] as ILeaderBoardEAI;
      dispatch(setUserContributeInfo(contribute));
    }
  };

  const fetchDepositAddress = async (address: string) => {
    const [depositExternal, depositNaka] = (await Promise.all([
      await cpaymentEAIAPI.getPublicSaleWalletInfo(),
      await cpaymentEAIAPI.getDepositNaka(),
    ])) as [WalletTokenDeposit[], WalletTokenDeposit[]];

    if (depositExternal && depositNaka) {
      dispatch(
        setWalletDeposit({
          address: address,
          depositExternal,
          depositNaka,
        }),
      );
    }
  };

  const getSummary = async () => {
    const summary = await cpaymentEAIAPI.getSummary();
    if (summary) {
      dispatch(setPublicSaleSummary(summary));
    }
  };

  const thGetSummary = React.useCallback(throttle(getSummary, 500), []);

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((value: number) => value + 1);
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  React.useEffect(() => {
    if (!address) return;
    fetchDepositAddress(address);
  }, [address]);

  React.useEffect(() => {
    thGetSummary();
    getUserContributeInfo(address);
  }, [address, needReload]);
};

export default useFetchPaymentEAI;
