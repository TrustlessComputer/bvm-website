/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { HEART_BEAT } from '@/constants/route-path';
import { shortCryptoAddress } from '@/utils/address';
import { formatCurrency } from '@/utils/format';
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
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import PortfolioTab from './PortfolioTab';
import PortfolioTabBitcoin from './PortfolioTabBitcoin';
import {
  L2RollupDetailContext,
  L2RollupDetailProvider,
} from './providers/l2-rollup-detail-context';
import SearchAddress from './SearchAddress';
import s from './styles.module.scss';
import TokenTransferTab from './TokenTransferTab';
import TransactionsTab from './TransactionsTab';
import TransactionsTabBitcoin from './TransactionsTabBitcoin';
import NFTTab from './NFTTab';
import ButtonFavorite from './FavoriteAddress';
import WatchListAddresses from './Watchlist';

const L2RollupDetail = () => {
  const router = useRouter();

  const {
    address,
    isValidAddress,
    isBTCAddress,
    balanceBitcoinInfo,
    totalBalanceUsd,
    totalBitcoinBalanceUsd,
  } = useContext(L2RollupDetailContext);

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
          <Flex alignItems={'center'} gap={'4px'} position={'relative'}>
            <SearchAddress className={s.search} />
            <WatchListAddresses />
          </Flex>
        </Flex>

        <Flex
          mt={{ base: '28px', md: '36px' }}
          gap={{ base: '16px', md: '20px' }}
          direction={'row'}
          alignItems={'center'}
        >
          <Image
            w={{ base: '80px', md: '140px' }}
            src={'/heartbeat/ic-wallet.svg'}
          />
          <Flex gap="6px" direction={'column'}>
            {isBTCAddress ? (
              <>
                <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                  <Text>Total asset value:</Text>
                  <Text fontWeight={'700'} fontSize={'20px'}>
                    {`$${formatCurrency(totalBitcoinBalanceUsd, 2, 2)}`}
                  </Text>
                </Flex>
                <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                  <Text>BTC balance:</Text>
                  <Text fontWeight={'700'} fontSize={'20px'}>
                    {`${formatCurrency(balanceBitcoinInfo?.balance, 2, 2)} BTC`}
                  </Text>
                </Flex>
              </>
            ) : (
              <Text fontWeight={'500'} fontSize={{ base: '28px', md: '32px' }}>
                {`$${formatCurrency(totalBalanceUsd, 2, 2)}`}
              </Text>
            )}
            <Flex
              direction={'row'}
              alignItems={'center'}
              gap={'8px'}
              mt={'2px'}
            >
              <Text fontWeight={'400'} fontSize={'16px'}>
                {isMobile ? shortCryptoAddress(address) : address}
              </Text>
              <Image
                className={s.iconCopy}
                w={{ base: '16px' }}
                src={'/heartbeat/ic-copy.svg'}
                onClick={() => {
                  copy(address);
                  toast.success('Copied');
                }}
              />
              <ButtonFavorite address={address} />
            </Flex>
          </Flex>
        </Flex>

        <Box position={'relative'} mt={{ base: '24px', md: '32px' }}>
          <Tabs className={s.tabContainer} defaultIndex={0}>
            {isBTCAddress ? (
              <>
                <TabList
                  className={s.tabList}
                  fontSize={['16px', '18px', ' 20px']}
                >
                  <Tab>Portfolio</Tab>
                  <Tab>Transactions</Tab>
                </TabList>
                <TabPanels className={s.tabPanel}>
                  <TabPanel minH={'40vh'}>
                    <PortfolioTabBitcoin />
                  </TabPanel>
                  <TabPanel minH={'40vh'}>
                    <TransactionsTabBitcoin />
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
        </Box>
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