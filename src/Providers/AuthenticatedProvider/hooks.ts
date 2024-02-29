'use client';

import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  authAddressSelector,
  authIsAutoReconnectingSelector,
  authUserInfoSelector,
  authWalletSelector,
} from '@/stores/states/auth/selector';
import { authenticatedInContext } from './constants';
import type { AuthenticatedContext } from './types';
// import AISDK from 'eternal-ai-sdk';

export const useAuthenticatedWallet = () => {
  return useSelector(authWalletSelector);
};

export const useAuthenticatedAddress = () => {
  return useSelector(authAddressSelector);
};

export const useAuthenticatedUserInfo = () => {
  return useSelector(authUserInfoSelector);
};

export const useAuthenticatedAutoReconnecting = () => {
  return useSelector(authIsAutoReconnectingSelector);
};

export const useWeb3Authenticated = (): AuthenticatedContext => {
  const actions = useContext(authenticatedInContext);
  const dispatch = useDispatch();
  const wallet = useAuthenticatedWallet();
  const address = useAuthenticatedAddress();
  const isAutoReconnecting = useAuthenticatedAutoReconnecting();
  const userInfo = useAuthenticatedUserInfo();

  const isLogged = !!userInfo;

  return {
    ...actions,
    wallet,
    address,
    isAutoReconnecting,
    userInfo,
    isLogged,
  };
};
