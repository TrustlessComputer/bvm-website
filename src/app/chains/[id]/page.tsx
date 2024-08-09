'use client';

// import UpdateChain from '@/modules/blockchains/Buy/UpdateChain';
// import Page from '@/modules/blockchains/detail_v2';
import Page from '@/modules/blockchains/detail_v4';
import MainLayout from '@/layouts/MainLayout';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import { Flex } from '@chakra-ui/react';
import AppLoading from '@components/AppLoading';
import React from 'react';

const PageDetail = () => {
  const { loading } = useFetchDapp();

  if (loading) {
    return (
      <Flex h="90vh">
        <AppLoading />
      </Flex>
    );
  }

  return (
    <MainLayout
      headerProps={{
        color: 'black',
        bgColor: '#F3F1E8',
      }}
      // hideHeader={true}
      // isHeaderCustom
      hideFooter={true}
      bodyColor={'#f3f1e8'}
    >
      <Page />
    </MainLayout>
  );
};

export default PageDetail;
