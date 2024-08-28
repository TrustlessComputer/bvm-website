import CRollupL2DetailAPI from '@/services/api/dapp/rollupl2-detail';
import { IRollupExplorer } from '@/services/api/dapp/rollupl2-detail/interface';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { L2RollupExplorerContext } from '../providers/l2-rollup-explorer-context';
import {
  Avatar,
  Badge,
  Box,
  Center,
  Flex,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import s from './styles.module.scss';
import toast from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import cs from 'classnames';
import Loading from '@/components/Loading';
import { openExtraLink } from '@/utils/helpers';
import { formatCurrency } from '@/utils/format';
import BigNumber from 'bignumber.js';
import TextNumberTooSmallDecimal from '@/components/TextNumberTooSmallDecimal';
import { compareString } from '@/utils/string';
import AddressCopy from '../TxBTCExplorer/addressCopy';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { commonSelector } from '@/stores/states/common/selector';

const TxERC20Explorer = () => {
  const router = useRouter();
  const { address, isERC20TxAddress } = useContext(L2RollupExplorerContext);
  const rollupBitcoinApi = useRef(new CRollupL2DetailAPI()).current;

  const coinPrices = useSelector(commonSelector).coinPrices;

  const [loading, setLoading] = useState(true);
  const [txRollup, setTxRollup] = useState<IRollupExplorer>();

  const transaction = txRollup?.transactions?.[0];
  const rollup = txRollup?.rollup;

  useEffect(() => {
    getTxInformation();
  }, [address]);

  const getTxInformation = async () => {
    try {
      if (!address || !isERC20TxAddress) {
        return;
      }

      const rs = await rollupBitcoinApi.getRollupL2Txs({ tx_hash: address });

      setTxRollup(rs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderStatus = useMemo(() => {
    if (!transaction?.status?.toString()) {
      return <></>;
    }
    if (transaction?.status === 1) {
      return <Text className={cs(s.tagConfirm, s.success)}>Success</Text>;
    }
    if (transaction?.status === 0) {
      return <Text className={cs(s.tagConfirm, s.error)}>Error</Text>;
    }
  }, [transaction?.status]);

  const gasFee = useMemo(
    () =>
      new BigNumber(transaction?.gas_used || '0')
        .multipliedBy(transaction?.gas_price || '0')
        .dividedBy(1e18)
        .toString(),
    [transaction],
  );

  const chainPriceUsd = useMemo(
    () => (coinPrices as any)?.[rollup?.symbol || ''] || '0',
    [coinPrices, rollup],
  );

  return loading ? (
    <Center mt={{ base: '28px', md: '36px' }}>
      <Loading />
    </Center>
  ) : !txRollup ? (
    <Flex
      direction={'column'}
      w="100%"
      maxW={'1580px'}
      minH={'50vh'}
      alignItems={'center'}
    >
      <Text fontSize={'20px'} mt={'40px'}>
        It looks like you're checking an incorrect transaction
      </Text>
    </Flex>
  ) : (
    <Center
      mt={{ base: '28px', md: '36px' }}
      gap={{ base: '16px', md: '20px' }}
      flexDirection={'column'}
    >
      <Flex
        className={s.topHeader}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Flex alignItems={'flex-end'} gap={'4px'}>
          <Text className={s.title}>Transaction</Text>
          <Text
            onClick={() => {
              copy(address);
              toast.success('Copied successfully!');
            }}
            as={'a'}
            className={s.txHash}
          >
            {address}
          </Text>
        </Flex>
      </Flex>
      <SimpleGrid width={'100%'} columns={1} className={s.information}>
        <Flex className={cs(s.rowItem, s.rowItemBold)}>
          <Text>Chain</Text>
          <Flex
            cursor={'pointer'}
            onClick={() => openExtraLink(rollup?.explorer || '')}
            flex={2}
            alignItems={'center'}
            gap={'2px'}
          >
            <Avatar width={'30px'} height={'30px'} src={rollup?.icon} />
            <Text>{rollup?.name}</Text>
          </Flex>
        </Flex>

        <Flex className={cs(s.rowItem)}>
          <Text>Status</Text>
          <Flex gap={'6px'} alignItems={'center'} flex={2}>
            {renderStatus}
          </Flex>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>Block</Text>
          <Flex gap={'6px'} alignItems={'center'} flex={2}>
            <Text>{transaction?.block_number}</Text>
            <Text className={s.tagBlockNumber}>
              Confirmed by{' '}
              {new BigNumber(rollup?.block_number || '0')
                .minus(transaction?.block_number || '0')
                .toString()}
            </Text>
          </Flex>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>Timestamp</Text>
          <Text>
            {dayjs(transaction?.inserted_at).format('YYYY-MM-DD HH:mm:ss')}
            <Text as={'span'}>
              {' '}
              ({dayjs(transaction?.inserted_at).toNow()})
            </Text>
          </Text>
        </Flex>

        <Flex className={cs(s.rowItem)}>
          <Text>From address</Text>
          <Box flex={2}>
            <AddressCopy
              address={transaction?.from_address || ''}
              onClick={() => router.push(transaction?.from_address || '')}
            />
          </Box>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>To address</Text>
          <Box flex={2}>
            <AddressCopy
              address={transaction?.to_address || ''}
              onClick={() => router.push(transaction?.to_address || '')}
            />
          </Box>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>Value</Text>
          <Text>
            {formatCurrency(transaction?.value || '0')}{' '}
            <Text as="span">{rollup?.symbol}</Text>
          </Text>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>L2 Gas Price</Text>
          <Text>
            {formatCurrency(
              new BigNumber(transaction?.gas_price || '0')
                .dividedBy(1e9)
                .toString(),
              0,
              9,
            )}{' '}
            <Text as="span">GWei</Text>
          </Text>
        </Flex>
        <Flex className={cs(s.rowItem)}>
          <Text>Transaction Fee</Text>
          <Text display={'flex'} alignItems={'center'} gap={'4px'}>
            <TextNumberTooSmallDecimal
              value={gasFee}
              isSats={compareString(rollup?.symbol, 'BTC')}
            />
            <Text as={'span'}>
              ($
              {formatCurrency(
                new BigNumber(gasFee).multipliedBy(chainPriceUsd).toString(),
                0,
                4,
              )}
              )
            </Text>
          </Text>
        </Flex>
        <Flex className={cs(s.rowItem, s.rowItemBold)}>
          <Text>Raw input</Text>
          <Text style={{ fontSize: '10px' }} wordBreak={'break-word'}>
            {transaction?.input}
          </Text>
        </Flex>
      </SimpleGrid>
    </Center>
  );
};

export default TxERC20Explorer;
