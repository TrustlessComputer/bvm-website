'use client';
import React, { PropsWithChildren, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setUser } from '@/stores/states/user/reducer';
import throttle from 'lodash/throttle';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { User } from '@/stores/states/user/types';
import { getReferralByURL, getReferralModularByURL } from '@/utils/helpers';
import userServices from '@/services/user';
import ReferralStorage from '@/utils/storage/referral.storage';
import { getCoinPrices, getConfigs } from '@/services/common';
import { setCoinPrices, setConfigs } from '@/stores/states/common/reducer';
import { useRouter } from 'next/navigation';

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
