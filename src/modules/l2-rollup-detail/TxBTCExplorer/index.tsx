import Loading from '@/components/Loading';
import TextNumberTooSmallDecimal from '@/components/TextNumberTooSmallDecimal';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { commonSelector } from '@/stores/states/common/selector';
import { formatCurrency } from '@/utils/format';
import { labelAmountOrNumberAdds } from '@/utils/string';
import { Center, Divider, Flex, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import cs from 'classnames';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import s from './styles.module.scss';
import ItemTransfer from './itemTransfer';

const TxBTCExplorer = () => {
  const { address } = useContext(L2RollupDetailContext);
  const [loading, setLoading] = useState(true);
  const [txBTC, setTxBTC] = useState<ITxBTC>();
  const coinPrices = useSelector(commonSelector).coinPrices;

  const btcPrice = useMemo(() => {
    return coinPrices?.['BTC'] || '0';
  }, [coinPrices]);

  const rollupBitcoinApi = useRef(new CRollupL2DetailBitcoinAPI()).current;

  useEffect(() => {
    getTxInformation();
  }, [address]);

  const getTxInformation = async () => {
    try {
      if (!address) {
        return;
      }

      const rs = await rollupBitcoinApi.getTxBTC(address);

      setTxBTC(rs);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const timestamp = useMemo(
    () =>
      new BigNumber(txBTC?.transaction_time || '0').dividedBy(1000).toNumber(),
    [txBTC],
  );

  return loading ? (
    <Center mt={{ base: '28px', md: '36px' }}>
      <Loading />
    </Center>
  ) : !txBTC ? (
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
    <>
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
          <Tag className={s.tagConfirm}>
            {formatCurrency(txBTC?.confirm, 0, 2)} confirmation
            {labelAmountOrNumberAdds(txBTC?.confirm || 0)}
          </Tag>
        </Flex>
        <SimpleGrid
          width={'100%'}
          columns={2}
          gap={{ base: '16px', md: '20px' }}
          className={s.information}
        >
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Timestamp</Text>
            <Text>
              {dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')}
              <Text as={'span'}> ({dayjs.unix(timestamp).toNow()})</Text>
            </Text>
          </Flex>
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Fee</Text>
            <Text display={'flex'} alignItems={'center'} gap={'12px'}>
              <TextNumberTooSmallDecimal value={txBTC.txfee} isSats={true} />
              <Text as={'span'}>{txBTC.transaction_symbol}</Text>
              <Text color={'green'}>
                $
                {formatCurrency(
                  new BigNumber(btcPrice).multipliedBy(txBTC.txfee).toString(),
                )}
              </Text>
            </Text>
          </Flex>
          <Flex className={cs(s.rowItem)}>
            <Text>Tnx index</Text>
            <Text>{txBTC.index}</Text>
          </Flex>
          <Flex className={cs(s.rowItem)}>
            <Text>Fee rate</Text>
            <Text display={'flex'} alignItems={'center'} gap={'12px'}>
              <TextNumberTooSmallDecimal
                value={new BigNumber(txBTC.txfee)
                  .dividedBy(txBTC.virtual_size || 1)
                  .toString()}
                isSats={true}
                hideSymbol={true}
              />
              <Text as="span">sats/vB</Text>
            </Text>
          </Flex>
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Height</Text>
            <Text>{txBTC.height}</Text>
          </Flex>
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Input | Output</Text>
            <Text>
              {formatCurrency(
                txBTC.input_details.reduce(
                  (p, c) => p + parseFloat(c.amount),
                  0,
                ),
                2,
                6,
              )}{' '}
              <Text as={'span'}>{txBTC.transaction_symbol} |</Text>{' '}
              {formatCurrency(
                txBTC.output_details.reduce(
                  (p, c) => p + parseFloat(c.amount),
                  0,
                ),
                2,
                6,
              )}{' '}
              <Text as={'span'}>{txBTC.transaction_symbol}</Text>
            </Text>
          </Flex>
        </SimpleGrid>
        <Flex w={'100%'}>
          <Tag background={'#000'} size={'lg'}>
            BTC transfers
          </Tag>
        </Flex>
        <Flex w={'100%'} flexDirection={'column'} gap={'24px'}>
          <Flex
            w={'100%'}
            gap={'24px'}
            borderBottom={'1px solid #f5f5f5'}
            pb={'12px'}
          >
            <Flex
              w={'100%'}
              flex={1}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text>Input</Text>
              <Text>({txBTC.input_details.length})</Text>
            </Flex>
            <Flex
              w={'100%'}
              flex={1}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Text>Output</Text>
              <Text>({txBTC.output_details.length})</Text>
            </Flex>
          </Flex>
          <SimpleGrid columns={2} w={'100%'} gap={'24px'}>
            <Flex flexDirection={'column'} gap={'12px'}>
              {txBTC.input_details.map((d, i) => (
                <ItemTransfer
                  key={`in_${d.output_hash}_${i}`}
                  data={d}
                  symbol={txBTC.transaction_symbol}
                />
              ))}
            </Flex>
            <Flex flexDirection={'column'} gap={'12px'}>
              {txBTC.output_details.map((d, i) => (
                <ItemTransfer
                  key={`in_${d.output_hash}_${i}`}
                  data={d}
                  symbol={txBTC.transaction_symbol}
                />
              ))}
            </Flex>
          </SimpleGrid>
        </Flex>
      </Center>
    </>
  );
};

export default TxBTCExplorer;
