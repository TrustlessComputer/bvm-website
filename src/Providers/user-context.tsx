"use client"
import React, { PropsWithChildren, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setUser } from '@/stores/states/user/reducer';
import throttle from 'lodash/throttle';
import { commonSelector } from '@/stores/states/common/selector';
import AuthenStorage from '@/utils/storage/authen.storage';
import { User } from '@/stores/states/user/types';
import { getReferralByURL } from '@/utils/helpers';
import userServices from '@/services/user';
import ReferralStorage from '@/utils/storage/referral.storage';
import useAllowBTC from '@/modules/Whitelist/AllowBTCMessage/useAllowBTC';
import { getCoinPrices } from '@/services/common';
import { setCoinPrices } from '@/stores/states/common/reducer';
import useAllowCelestia from '@/modules/Whitelist/AllowCelestiaMessage/useAllowCelestia';

export interface IUserContext {}

const initialValue: IUserContext = {};

export const UserContext = React.createContext<IUserContext>(initialValue);

export const UserProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  useAllowBTC();
  useAllowCelestia();

  const dispatch = useAppDispatch();
  const needReload = useAppSelector(commonSelector).needReload;
  const token = AuthenStorage.getAuthenKey();

  const fetchUserInfo = async () => {
    const userInfo = await userServices.getUser()
    dispatch(setUser(userInfo as User))
  };

  const throttleFetchUserInfo = React.useCallback(throttle(fetchUserInfo, 300), []);

  const fetchCoinPrices = async () => {
    const coinPrices = await getCoinPrices();
    if (!coinPrices) return;
    dispatch(setCoinPrices(coinPrices));
  }

  const contextValues = useMemo((): IUserContext => {
    return {};
  }, []);

  React.useEffect(() => {
    if (!token) return;
    throttleFetchUserInfo()
  }, [needReload, token]);

  // GET REFERRAL CODE
  React.useEffect(() => {
    const code = getReferralByURL();
    if (code) {
      ReferralStorage.setReferralCode(code)
    }
  }, []);

  React.useEffect(() => {
    fetchCoinPrices();
    setInterval(() => {
      fetchCoinPrices()
    }, 60 * 1000)
  }, [])

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};
