/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { HEART_BEAT } from '@/constants/route-path';
import { shortCryptoAddress } from '@/utils/address';
import { validateBTCAddress, validateEVMAddress } from '@/utils/validate';
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
import { useParams, useRouter } from 'next/navigation';
import React, { useMemo, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import PortfolioTab from './PortfolioTab';
import SearchBar from './SearchBar';
import s from './styles.module.scss';
import TransactionsTab from './TransactionsTab';

const L2RollupAddress = () => {
  const params = useParams();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const address = useMemo(() => params?.id as string, [params]);

  const [searchAddress, setSearchAddress] = useState('');

  const isValidAddress = useMemo(
    () => validateEVMAddress(address) || validateBTCAddress(address),
    [address],
  );

  const isValidSearchAddress = useMemo(
    () =>
      validateEVMAddress(searchAddress) || validateBTCAddress(searchAddress),
    [searchAddress],
  );

  useOnClickOutside(ref, () => setSearchAddress(''));

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
      <Flex direction={'column'} w="100%" maxW={'1048px'}>
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

          <Flex ref={ref} position={'relative'} direction={'column'}>
            <SearchBar
              txtSearch={searchAddress}
              setTxtSearch={setSearchAddress}
              placeholder="Search address "
              onEnterSearch={() => {
                if (isValidSearchAddress) {
                  router.push(`${HEART_BEAT}/${searchAddress}`);
                }
              }}
            />
            {searchAddress && (
              <Flex
                position={'absolute'}
                top={'52px'}
                left={'0px'}
                borderRadius={'8px'}
                className={s.searchResult}
              >
                {isValidSearchAddress ? (
                  <Flex
                    direction={'row'}
                    alignItems={'center'}
                    gap={'6px'}
                    cursor={'pointer'}
                    pr={'12px'}
                    onClick={() =>
                      router.push(`${HEART_BEAT}/${searchAddress}`)
                    }
                  >
                    <Image w={'14px'} src={'/heartbeat/ic-link.svg'} />
                    <Text fontSize={'12px'}>{searchAddress}</Text>
                  </Flex>
                ) : (
                  <>
                    <Text minW={'200px'} fontSize={'12px'}>
                      No match
                    </Text>
                  </>
                )}
              </Flex>
            )}
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
            <Text fontWeight={'500'} fontSize={{ base: '28px', md: '32px' }}>
              $200.56
            </Text>
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
            </Flex>
          </Flex>
        </Flex>

        <Tabs
          className={s.tabContainer}
          mt={{ base: '24px', md: '32px' }}
          defaultIndex={0}
        >
          <TabList className={s.tabList} fontSize={['16px', '18px', ' 20px']}>
            <Tab>Portfolio</Tab>
            <Tab>Transactions</Tab>
          </TabList>
          <TabPanels className={s.tabPanel}>
            <TabPanel minH={'40vh'}>
              <PortfolioTab />
            </TabPanel>
            <TabPanel minH={'40vh'}>
              <TransactionsTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
};

export default L2RollupAddress;
