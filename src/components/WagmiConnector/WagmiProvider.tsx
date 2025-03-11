'use client';

import {
  ARBITRUM_CHAIN_ID,
  wagmiConfig,
  configWagmiChains,
} from '@components/WagmiConnector/config';
import useWagmiStore from '@components/WagmiConnector/hooks/useWagmiStore';
import { compareString } from '@utils/string';
import {
  sendTransaction,
  type SendTransactionReturnType,
  waitForTransactionReceipt,
} from '@wagmi/core';
import BigNumberJS from 'bignumber.js';
import React, { createContext, PropsWithChildren } from 'react';
import { Hex, parseEther } from 'viem';
import {
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from 'wagmi';

type Transaction = {
  to: string;
  value?: string;
  data: string;
  wait?: boolean;
  chainId?: number;
};

type GetAccessTokenParams = {
  address: string;
};

type SignMessageRequest = {
  message: string;
  address?: string;
};

export type SignMessageResponse = {
  message: string;
  signature: string;
  address: string;
};

type IWagmiProviderContext = {
  onConnect: (chainId?: number) => Promise<string | undefined>;
  onDisconnect: () => void;
  isPending: boolean;
  onSwitchChain: (chainId?: number) => Promise<void>;
  onSendTransaction: (
    params: Transaction,
  ) => Promise<SendTransactionReturnType | undefined>;
  nativeAmountFormated: string;
  address?: string;
  latestAddress?: string;
  isConnected?: boolean;
  chainId?: number;
  onSignMessage: (_: SignMessageRequest) => Promise<SignMessageResponse>;
};

export const WagmiProviderContext = createContext<IWagmiProviderContext>({
  onConnect: async (_?: number) => '',
  isPending: false,
  onSwitchChain: () => Promise.resolve(),
  onDisconnect: () => undefined,
  onSendTransaction: async () => undefined,
  nativeAmountFormated: '0',
  address: undefined,
  latestAddress: undefined,
  isConnected: false,
  chainId: undefined,
  onSignMessage: async () => ({ message: '', signature: '', address: '' }),
});

export const WagmiProvider = ({ children }: PropsWithChildren) => {
  const { isConnected, address, chainId } = useAccount();
  const { connectors, isPending, connectAsync } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();

  const { latestAddress, setLatestAddress } = useWagmiStore();

  const nativeAmount = useBalance({
    address: (latestAddress || address) as Hex,
    chainId: ARBITRUM_CHAIN_ID,
    blockTag: 'latest',
  });

  const getConnector = () => {
    return connectors[0];
  };

  const nativeAmountFormated = React.useMemo(() => {
    let amount = (nativeAmount?.data?.formatted || '0') as string;
    amount = new BigNumberJS(
      new BigNumberJS(amount).toFixed(4, BigNumberJS.ROUND_FLOOR),
    ).toString();
    if (amount === '0') {
      return '0.00';
    }
    return amount;
  }, [nativeAmount?.data]);

  const onConnect = async (chainId = ARBITRUM_CHAIN_ID) => {
    const connector = getConnector();
    if (!window?.ethereum) {
      throw new Error('MetaMask not found');
    }
    if (isConnected || address) {
      setLatestAddress(address);
      return address as string;
    }
    const { accounts } = await connectAsync({ connector, chainId: chainId });
    const connectedAddress = accounts[0];
    setLatestAddress(connectedAddress);
    return connectedAddress;
  };

  const onSwitchChain = async (requestChainId = ARBITRUM_CHAIN_ID) => {
    if (!compareString(chainId, requestChainId)) {
      const connector = getConnector();
      try {
        const data = await switchChainAsync({
          connector,
          chainId: requestChainId,
        });
        console.log('===switchChainAsyncSuccess', data);
      } catch (error) {
        console.log('===switchChainAsyncError', error);
        // If the chain is not available, prompt to add it to MetaMask
        if ((error as any).code === 4902) {
          try {
            // alert('SwitchERROR');
            const requestChain = configWagmiChains.find((chain: any) =>
              compareString(chain.id, requestChainId),
            );
            if (requestChain)
              await (window.ethereum as any)?.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: `0x${requestChain.id.toString(16)}`, // Chain ID in hex format
                    chainName: requestChain.name,
                    nativeCurrency: requestChain.nativeCurrency,
                    rpcUrls: requestChain.rpcUrls.default.http,
                    blockExplorerUrls: [
                      requestChain.blockExplorers.default.url,
                    ],
                  },
                ],
              });
          } catch (addError) {
            console.error(
              'Failed to add the custom chain to MetaMask:',
              addError,
            );
          }
        } else {
          console.error('Failed to switch to the custom chain:', error);
        }
      }
    }
  };

  const onSendTransaction = async (params: Transaction) => {
    try {
      const {
        to,
        value,
        data,
        wait = true,
        chainId = ARBITRUM_CHAIN_ID,
      } = params;

      console.log('chainId', chainId);
      await onSwitchChain(chainId as any);
      const hash: SendTransactionReturnType = await sendTransaction(
        wagmiConfig as any,
        {
          chainId: chainId as any,
          data: data as Hex,
          to: to as Hex,
          value: value ? parseEther(value) : undefined,
        },
      );

      if (wait) {
        await waitForTransactionReceipt(wagmiConfig as any, {
          chainId: chainId as any,
          hash,
          confirmations: 1,
        });
      }

      return hash;
    } catch (error) {
      console.log('errorerrorerror', error);
      throw error;
    }
  };

  const onDisconnect = () => {
    disconnect();
    setLatestAddress(undefined);
  };

  const onSignMessage = async (params: SignMessageRequest) => {
    try {
      let _address = params?.address || address || '';
      if (!isConnected) {
        _address = await onConnect();
      }

      if (!address) {
        throw new Error('No address found');
      }

      const signature = await signMessageAsync({
        message: params.message,
        account: _address as Hex,
      });

      return {
        message: params.message,
        address: _address,
        signature,
      };
    } catch (error) {
      console.error('onSignMessage Error: ', error);
      throw error;
    }
  };

  const value = React.useMemo(() => {
    return {
      onConnect,
      isPending,
      onSwitchChain,
      onSendTransaction,
      nativeAmountFormated,
      address,
      latestAddress: address || latestAddress,
      isConnected,
      onDisconnect,
      chainId,
      onSignMessage,
    };
  }, [
    isPending,
    nativeAmountFormated,
    address,
    isConnected,
    latestAddress,
    chainId,
  ]);

  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data);
      setLatestAddress(data.address);
    },
    onDisconnect() {
      console.log('Disconnected!');
      setLatestAddress(undefined);
    },
  });

  return (
    <WagmiProviderContext.Provider value={value as any}>
      {children}
    </WagmiProviderContext.Provider>
  );
};

export default WagmiProvider;

export const useWagmiContext = () => {
  return React.useContext(WagmiProviderContext);
};
