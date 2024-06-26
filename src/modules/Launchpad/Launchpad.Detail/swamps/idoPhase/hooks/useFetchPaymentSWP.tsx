import useNakaAuthen from '@/hooks/useRequestNakaAccount';
import { WalletTokenDeposit } from '@/modules/Launchpad/services/launchpad.interfaces';
import { ILeaderBoardEAI } from '@/modules/Launchpad/services/laupEAI-payment.interfaces';
import CPaymentSWPAPI from '@/modules/Launchpad/services/payment.swp';
import {
  setPublicSaleSummary,
  setUserContributeInfo,
  setWalletDeposit,
} from '@/modules/Launchpad/store/lpEAIPayment/reducer';
import throttle from 'lodash/throttle';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

const useFetchPaymentSWP = () => {
  const cpaymentSWPAPI = useRef(new CPaymentSWPAPI()).current;
  const wallet = useNakaAuthen();
  const dispatch = useDispatch();

  const address = wallet?.nakaAddress;

  const [counter, setCounter] = React.useState(0);

  const getUserContributeInfo = async (address?: string) => {
    if (!address) return;
    const { data } = await cpaymentSWPAPI.getPublicSaleLeaderBoards({
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
      await cpaymentSWPAPI.getPublicSaleWalletInfo(),
      await cpaymentSWPAPI.getDepositNaka(),
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
    const summary = await cpaymentSWPAPI.getSummary();
    if (summary) {
      dispatch(setPublicSaleSummary(summary));
    }
  };

  const thGetSummary = React.useCallback(throttle(getSummary, 500), []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCounter((value: number) => value + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (!address) return;
    fetchDepositAddress(address);
  }, [address]);

  React.useEffect(() => {
    thGetSummary();
    getUserContributeInfo(address);
  }, [address, counter]);
};

export default useFetchPaymentSWP;
