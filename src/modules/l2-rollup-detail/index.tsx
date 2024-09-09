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
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import ButtonFavorite from './FavoriteAddress';
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
import WatchListAddresses from './Watchlist';
import { formatAiSummary } from './utils';
import MarkdownComponent from './MarkdownComponent';

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
            <Text>Bitcoin Heartbeats Project</Text>
          </Flex>
          <Flex alignItems={'center'} gap={'4px'} position={'relative'}>
            <SearchAddress
              className={s.search}
              placeholder={'Search by Address / Txn Hash'}
              icSearchAtLeft
            />
            <WatchListAddresses />
          </Flex>
        </Flex>

        <Flex
          mt={{ base: '28px', md: '36px' }}
          gap={{ base: '0px', md: '20px' }}
          direction={'row'}
          alignItems={'flex-start'}
          // alignItems={'center'}
        >
          <Image
            w={{ base: '0px', md: '140px' }}
            src={'/heartbeat/ic-wallet.svg'}
          />
          <Flex gap="6px" direction={'column'} w={'100%'}>
            <Flex direction={'row'} alignItems={'center'} gap={'8px'}>
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
            {isBTCAddress && (
              <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                <Text>BTC balance:</Text>
                <Text fontWeight={'600'} fontSize={'16px'}>
                  {`${formatCurrency(balanceBitcoinInfo?.balance, 2, 6)} BTC ${
                    rollupBitcoinBalances && rollupBitcoinBalances.length > 0
                      ? `($${formatCurrency(
                          rollupBitcoinBalances.find(
                            (balance) => balance.title === 'BTC',
                          )?.amountUsd || 0,
                          2,
                          2,
                        )})`
                      : ''
                  }`}
                </Text>
              </Flex>
            )}
            <Flex className={s.boxAi} mt={'4px'} direction={'column'}>
              <Flex
                w="100%"
                justifyContent="space-between"
                bg={'#FF7E211A'}
                py={'12px'}
              >
                <Text
                  pl={'16px'}
                  fontSize={'14px'}
                  fontWeight={'500'}
                  color={'#fa4e0e'}
                >
                  Wallet Analysis
                </Text>
                <Text
                  pr={'16px'}
                  fontSize={'14px'}
                  fontWeight={'500'}
                  color={'#808080'}
                >
                  Analyzed by{' '}
                  <Text
                    as="a"
                    _hover={{ textDecoration: 'underline' }}
                    color="black"
                    href="https://eternalai.org/"
                    target="_blank"
                  >
                    Eternal AI
                  </Text>
                </Text>
              </Flex>
              <Box h={'1px'} w={'100%'} bg={'#f58257'} mb={'8px'} />
              <Flex direction={'column'} px={'16px'}>
                {isLoadingAI ? (
                  <Flex direction={'row'} alignItems={'center'} gap={'4px'}>
                    <Text>Analyzing...</Text>
                    <Skeleton w={'120px'} h={'20px'} speed={1.2} />
                  </Flex>
                ) : (
                  <>
                    {aiSummary && (
                      <MarkdownComponent text={formatAiSummary(aiSummary)} />
                    )}
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
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
