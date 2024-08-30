/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { HEART_BEAT } from '@/constants/route-path';
import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import NFTTab from './NFTTab';
import PortfolioTab from './PortfolioTab';
import PortfolioTabBitcoin from './PortfolioTabBitcoin';
import {
  L2RollupDetailContext,
  L2RollupDetailProvider,
} from './providers/l2-rollup-detail-context';
import SearchAddress from './SearchAddress';
import s from './styles.module.scss';
import TokenTransferTab from './TokenTransferTab';
import TokenTransferTabBitcoin from './TokenTransferTabBitcoin';
import TransactionsTab from './TransactionsTab';
import TransactionsTabBitcoin from './TransactionsTabBitcoin';

const L2RollupDetail = () => {
  const {
    address,
    aiSummary,
    isLoadingAI,
    isValidAddress,
    isBTCAddress,
    balanceBitcoinInfo,
    rollupBitcoinBalances,
  } = useContext(L2RollupDetailContext);
  const router = useRouter();

  if (!isValidAddress) {
    return (
      <Box className={s.container}>
        <Flex
          direction={'column'}
          w="100%"
          maxW={'1580px'}
          minH={'50vh'}
          alignItems={'center'}
        >
          <Text fontSize={'20px'} mt={'40px'}>
            It looks like you're checking an incorrect address
          </Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box className={s.container}>
      <Flex direction={'column'} w="100%" maxW={'1140px'}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'flex-start', md: 'center' }}
          justifyContent={'space-between'}
          gap={{ base: '16px', md: '8px' }}
        >
          <Flex
            className={s.backBtn}
            direction={{ base: 'row' }}
            alignItems={'center'}
            gap={'8px'}
            onClick={() => router.push(HEART_BEAT)}
          >
            <Image w={'24px'} src={'/heartbeat/ic-back.svg'} />
            <Text>Bitcoin Heartbeat Project</Text>
          </Flex>
          <SearchAddress className={s.search} />
        </Flex>
        <Tabs
          className={s.tabContainer}
          mt={{ base: '24px', md: '32px' }}
          defaultIndex={0}
        >
          {isBTCAddress ? (
            <>
              <TabList
                className={s.tabList}
                fontSize={['16px', '18px', ' 20px']}
              >
                <Tab>Portfolio</Tab>
                <Tab>Transactions</Tab>
                <Tab>Token Transfer</Tab>
              </TabList>
              <TabPanels className={s.tabPanel}>
                <TabPanel minH={'40vh'}>
                  <PortfolioTabBitcoin />
                </TabPanel>
                <TabPanel minH={'40vh'}>
                  <TransactionsTabBitcoin />
                </TabPanel>
                <TabPanel minH={'40vh'}>
                  <TokenTransferTabBitcoin />
                </TabPanel>
              </TabPanels>
            </>
          ) : (
            <>
              <TabList
                className={s.tabList}
                fontSize={['16px', '18px', ' 20px']}
              >
                <Tab>Portfolio</Tab>
                <Tab>Transactions</Tab>
                <Tab>Token Transfer</Tab>
                <Tab>NFTs</Tab>
              </TabList>
              <TabPanels className={s.tabPanel}>
                <TabPanel minH={'40vh'}>
                  <PortfolioTab />
                </TabPanel>
                <TabPanel minH={'40vh'}>
                  <TransactionsTab />
                </TabPanel>
                <TabPanel minH={'40vh'}>
                  <TokenTransferTab />
                </TabPanel>
                <TabPanel minH={'40vh'}>
                  <NFTTab />
                </TabPanel>
              </TabPanels>
            </>
          )}
        </Tabs>
      </Flex>
    </Box>
  );
};

const ModuleL2RollupDetail = () => {
  return (
    <L2RollupDetailProvider>
      <L2RollupDetail />
    </L2RollupDetailProvider>
  );
};

export default ModuleL2RollupDetail;
