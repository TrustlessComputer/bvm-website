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

  const deployAIModel = async () => {
    try {
      let result;

      const params = {
        rpcURL: 'https://l2-node.regtest.trustless.computer',
        contractAddress: '0xF4e3F901DDf2F50B68e48123e317CfD37c2f7541',
        privateKey: wallet?.privateKey || '',
        address: wallet?.address || '',
        modelID: '0',
        imgRaw: '' as any,
      };
      console.log('[deployAIModel] PARAM ---- ', params);
      // result = await window.eternalAISDK.classify(params);
      // eslint-disable-next-line prefer-const
      // result = await AISDK.classify(params);
      console.log('[deployAIModel] RESULT ---- ', result);
    } catch (error) {
      console.log('[deployAIModel] ERROR: ', error);
    }
  };

  return {
    ...actions,
    wallet,
    address,
    isAutoReconnecting,
    userInfo,
    deployAIModel,
    isLogged,
  };
};
