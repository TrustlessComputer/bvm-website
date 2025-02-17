"use client";

import React, { PropsWithChildren } from 'react';
import { wagmiConfig } from '@components/WagmiConnector/config';
import {  WagmiProvider as WagmiProviderAPI } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

const WagmiConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProviderAPI config={wagmiConfig}>
        {children}
      </WagmiProviderAPI>
    </QueryClientProvider>
  );
}

export default WagmiConfigProvider;
