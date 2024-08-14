'use client'

import Template from '@/modules/blockchains/Buy/Template';
import MainLayout from '@layouts/MainLayout';
import useFetchDapp from '@/modules/blockchains/dapp/hooks/useFetchDapp';
import AppLoading from '@components/AppLoading';
import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '@/stores/hooks';
import { dappSelector } from '@/stores/states/dapp/selector';
import styles from './styles.module.scss';

const TemplatePage = () => {
  const { loading } = useFetchDapp();

  const chain = useAppSelector(dappSelector)?.chain

  if (loading) {
    return <AppLoading />;
  }

  if (!chain) {
    return ;
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
      <Flex className={styles.containerV3} flexDirection="column">
        <Template />
      </Flex>

    </MainLayout>
  );
}

export default TemplatePage;
