'use client';

import RollupsDappPage from './page';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import AppLoading from '@components/AppLoading';
import React from 'react';
import { Flex } from '@chakra-ui/react';

export default () => {
  useFetchDapp();
  return <RollupsDappPage />;
  const { loading, configs } = useFetchDapp();

  if (loading) {
    return (
      <Flex h="90vh">
        <AppLoading />
      </Flex>
    );
  }
  return <RollupsDappPage />;
};
