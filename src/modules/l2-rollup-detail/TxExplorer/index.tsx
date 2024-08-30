'use client';

import { HEART_BEAT } from '@/constants/route-path';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import {
  L2RollupExplorerContext,
  L2RollupExplorerProvider,
} from '../providers/l2-rollup-explorer-context';
import SearchAddress from '../SearchAddress';
import s from './styles.module.scss';
import TxBTCExplorer from '../TxBTCExplorer';
import TxERC20Explorer from '../TxERC20Explorer';
import WatchListAddresses from '../Watchlist';

const TxExplorerModuleHandle = () => {
  const router = useRouter();
  const { address, isBTCTxAddress, isERC20TxAddress } = useContext(
    L2RollupExplorerContext,
  );

  const renderContent = () => {
    if (isBTCTxAddress) {
      return <TxBTCExplorer />;
    }
    if (isERC20TxAddress) {
      return <TxERC20Explorer />;
    }
    return (
      <Text fontSize={'20px'} mt={'40px'}>
        It looks like you're checking an incorrect transaction hash
      </Text>
    );
  };

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
        {renderContent()}
      </Flex>
    </Box>
  );
};

const TxExplorerModule = () => {
  return (
    <L2RollupExplorerProvider>
      <TxExplorerModuleHandle />
    </L2RollupExplorerProvider>
  );
};

export default TxExplorerModule;
