'use client';

// import RollupsDappPage from './page';
import RollupsDappPage from './page_v2';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import AppLoading from '@components/AppLoading';
import React from 'react';
import { Flex } from '@chakra-ui/react';

export default () => {
  const { loading } = useFetchDapp();

  if (loading) {
    return (
      <Flex h="90vh">
        <AppLoading />
      </Flex>
    );
  }
  return <RollupsDappPage />;
};
