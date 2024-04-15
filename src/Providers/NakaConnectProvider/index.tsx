'use client';
import React, { PropsWithChildren, useMemo } from 'react';
import * as nakaConnect from 'naka-connect';
import { isProduction, PERP_API_URL } from '@/config';
import { DappConnect } from 'naka-connect';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { nakaAddressSelector } from '@/stores/states/user/selector';
import toast from 'react-hot-toast';
import { setNakaUser } from '@/stores/states/user/reducer';

export interface INakaConnectContext {
  getConnector: () => DappConnect;
  loading: LoadingType | undefined;
  requestAccount: () => Promise<void>;
}

export const WALLET_URL = isProduction
  ? 'https://nakachain.xyz'
  : 'https://dev.nakachain.xyz';
export const STAKING_URL = `${WALLET_URL}/staking`;

type LoadingType = 'account' | 'sign-message' | 'sign-transaction';

const initialValue: INakaConnectContext = {
  getConnector: () => undefined as any,
  loading: undefined,
  requestAccount: async () => undefined,
};

export const NakaConnectContext =
  React.createContext<INakaConnectContext>(initialValue);

export const NakaConnectProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<LoadingType | undefined>(
    undefined,
  );
  const address = useAppSelector(nakaAddressSelector);

  const getConnector = () => {
    return new nakaConnect.DappConnect(PERP_API_URL, WALLET_URL);
  };

  const requestAccount = async () => {
    const connector = getConnector();

    try {
      setLoading('account');
      const data = await connector.requestAccount({
        target: '_blank',
      });

      if (data?.accounts && data?.accounts?.length) {
        const account = data.accounts[0];
        dispatch(
          setNakaUser({
            address: account.address,
            token: account.authToken,
          }),
        );
      }
    } catch (error: any) {
      const message = error?.message || '';
      toast.error(message);
    } finally {
      setLoading(undefined);
    }
  };

  const contextValues = useMemo((): INakaConnectContext => {
    return { getConnector, loading, requestAccount };
  }, [getConnector, requestAccount, loading]);

  return (
    <NakaConnectContext.Provider value={contextValues}>
      {children}
    </NakaConnectContext.Provider>
  );
};
