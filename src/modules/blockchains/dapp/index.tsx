'use client';

import RollupsDappPage from './page';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import AppLoading from '@components/AppLoading';
import React from 'react';
import { Flex } from '@chakra-ui/react';

export default () => {
  const { loading, configs } = useFetchDapp();

  if (loading || !configs?.length) {
    return (
      <Flex h="90vh">
        <AppLoading />
      </Flex>
    )
  }
  return (
    <RollupsDappPage />
  );
};
