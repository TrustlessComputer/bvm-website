import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import CPaymentEAIAPI from '@/modules/Launchpad/services/payment.eai';
import {
  setPublicSaleSummary,
  setUserContributeInfo,
  setWalletDeposit,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import { commonSelector } from '@/stores/states/common/selector';
import throttle from 'lodash/throttle';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useFetchPaymentEAI = () => {
  const cpaymentEAIAPI = useRef(new CPaymentEAIAPI()).current;
  const { nakaAddress } = useNakaAuthen();
  const dispatch = useDispatch();
  const needReload = useSelector(commonSelector).needReload;
  // const [counter, setCounter] = React.useState(0);

  const getUserContributeInfo = async (address?: string) => {
    if (!nakaAddress) return;
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
    if (!nakaAddress) return;
    fetchDepositAddress(nakaAddress);
  }, [nakaAddress]);

  React.useEffect(() => {
    thGetSummary();
    getUserContributeInfo(nakaAddress);
  }, [nakaAddress, needReload]);
};

export default useFetchPaymentEAI;
