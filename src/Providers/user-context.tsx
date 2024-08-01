'use client';
import React, { PropsWithChildren, useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setUser } from '@/stores/states/user/reducer';
import throttle from 'lodash/throttle';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { User } from '@/stores/states/user/types';
import {
  getRefCodeByURL,
  getReferralByURL,
  getReferralModularByURL,
} from '@/utils/helpers';
import userServices from '@/services/user';
import ReferralStorage from '@/utils/storage/referral.storage';
import { getCoinPrices, getConfigs } from '@/services/common';
import { setCoinPrices, setConfigs } from '@/stores/states/common/reducer';
import { useRouter } from 'next/navigation';
import CReferralAPI from '@/services/api/referrals';
import { setUserReferral } from '@/stores/states/referrals/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import useL2Service from '@hooks/useL2Service';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';

export interface IUserContext {}

const initialValue: IUserContext = {};

export const UserContext = React.createContext<IUserContext>(initialValue);

export const UserProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const needReload = useAppSelector(commonSelector).needReload;
  const token =
    AuthenStorage.getAuthenKey() || AuthenStorage.getGuestAuthenKey();
  const guestCode = AuthenStorage.getGuestSecretKey();
  const userApi = useRef(new CReferralAPI()).current;
  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);
  const addressL2 = accountInforL2Service?.tcAddress;
  const refCodeChain = ReferralStorage.getRefCodeChain();

  const { getAccountInfor } = useL2Service();
  const { loggedIn } = useWeb3Auth();

  useEffect(() => {
    const referral = refCodeChain;
    if (loggedIn && addressL2 && referral) {
      submitReferrerCode(addressL2, referral);
    }
  }, [loggedIn, addressL2, refCodeChain]);

  const submitReferrerCode = async (address: string, referral: string) => {
    try {
      await userApi.setReferrerCode({
        referral_code: referral,
        address: address,
      });
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getAccountInfor();
  }, [loggedIn]);

  const fetchUserInfo = async () => {
    const userInfo = await userServices.getUser();
    const userInfoData = {
      ...userInfo,
      guest_code: guestCode,
    };
    dispatch(setUser(userInfoData as User));
  };

  const throttleFetchUserInfo = React.useCallback(
    throttle(fetchUserInfo, 300),
    [],
  );

  const fetchUserReferralInfo = async (address: string) => {
    const data = await userApi.getUserReferralInfo({ address: address });
    dispatch(setUserReferral(data));
  };

  const throttleFetchUserReferralInfo = React.useCallback(
    throttle(() => fetchUserReferralInfo(addressL2 as string), 300),
    [addressL2],
  );

  const fetchCoinPrices = async () => {
    const coinPrices = await getCoinPrices();
    if (!coinPrices) return;
    dispatch(setCoinPrices(coinPrices));
  };

  const fetchConfigs = async () => {
    const configs = await getConfigs();
    if (!configs) return;
    dispatch(setConfigs(configs));
  };

  const contextValues = useMemo((): IUserContext => {
    return {};
  }, []);

  React.useEffect(() => {
    if (!token) return;
    throttleFetchUserInfo();
  }, [needReload, token]);

  React.useEffect(() => {
    if (!addressL2) return;
    throttleFetchUserReferralInfo();
  }, [addressL2, needReload]);

  // GET REFERRAL CODE
  React.useEffect(() => {
    const code = getReferralByURL();
    if (code) {
      ReferralStorage.setReferralCode(code);
      setTimeout(() => router.replace('/public-sale'), 100);
    }
  }, []);

  // GET REFERRAL MODULAR
  React.useEffect(() => {
    const code = getReferralModularByURL();
    if (code) {
      ReferralStorage.setReferralModular(code);
    }
  }, []);

  React.useEffect(() => {
    const code = getRefCodeByURL();
    if (code) {
      ReferralStorage.setRefCodeChain(code);
    }
  }, []);

  React.useEffect(() => {
    fetchCoinPrices();
    fetchConfigs();
    setInterval(() => {
      fetchCoinPrices();
      fetchConfigs();
    }, 60 * 1000);
  }, []);

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
