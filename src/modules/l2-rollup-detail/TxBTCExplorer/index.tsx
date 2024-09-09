'use client';

import Loading from '@/components/Loading';
import TextNumberTooSmallDecimal from '@/components/TextNumberTooSmallDecimal';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import CMempoolApi from '@/services/api/mempool';
import { commonSelector } from '@/stores/states/common/selector';
import { formatCurrency } from '@/utils/format';
import { labelAmountOrNumberAdds } from '@/utils/string';
import {
  Box,
  Center,
  Flex,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import cs from 'classnames';
import copy from 'copy-to-clipboard';
import dayjs from 'dayjs';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { L2RollupExplorerContext } from '../providers/l2-rollup-explorer-context';
import BlockConfirm from './blockConfirm';
import ItemTransfer from './itemTransfer';
import s from './styles.module.scss';
import TokenTransfers from './tokenTransfer';
import { shortCryptoAddress } from '@/utils/address';
import { isMobile } from 'react-device-detect';

const TxBTCExplorer = () => {
  const { address, isBTCTxAddress } = useContext(L2RollupExplorerContext);
  const [isFBTxAddress, setIsFBTxAddress] = useState(false);

  const [loading, setLoading] = useState(true);
  const [txBTC, setTxBTC] = useState<ITxBTC>();
  const coinPrices = useSelector(commonSelector).coinPrices;
  const needReload = useSelector(commonSelector).needReload;
  const [indexBlock, setIndexBlock] = useState(0);
  const [timeAvg, setTimeAvg] = useState(0);

  const btcPrice = useMemo(() => {
    return coinPrices?.['BTC'] || '0';
  }, [coinPrices]);

  const rollupBitcoinApi = useRef(new CRollupL2DetailBitcoinAPI()).current;
  const mempoolApi = useRef(new CMempoolApi()).current;

  useEffect(() => {
    getTxInformation();
  }, [address, needReload]);

  const processETA = useMemo(() => {
    return (timeAvg / 1000 / 60) * indexBlock;
  }, [indexBlock, timeAvg]);

  const getTxInformation = async () => {
    try {
      if (!address || !isBTCTxAddress) {
        return;
      }

      const rs = await rollupBitcoinApi.getTxBTC(address);
      if (!rs?.tx_id) return;

      let isFBChain = false;
      if (rs?.chain === 'fractal') {
        isFBChain = true;
        setIsFBTxAddress(true);
      }

      const rs1 = await mempoolApi.getTransactionTime(address, isFBChain);
      const _rs: any = rs;

      if (rs1?.[0]) {
        _rs.transaction_time = rs1?.[0] * 1000;
      }

      setTxBTC(_rs);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const timestamp = useMemo(
    () =>
      new BigNumber(txBTC?.transaction_time || '0')
        .dividedBy(isFBTxAddress ? 1 : 1000)
        .toNumber(),
    [txBTC, isFBTxAddress],
  );

  const isProcessing = useMemo(
    () => txBTC?.state === 'pending',
    [txBTC?.state],
  );

  const renderState = () => {
    if (isProcessing) {
      return (
        <Tag className={cs(s.tagConfirm, s.tagUnConfirm)}>Unconfirmed</Tag>
      );
    }
    return (
      <Tag className={s.tagConfirm}>
        {formatCurrency(txBTC?.confirm, 0, 2)} confirmation
        {labelAmountOrNumberAdds(txBTC?.confirm || 0)}
      </Tag>
    );
  };

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
          gap={'4px'}
        >
          <Flex
            alignItems={['flex-start', 'flex-end']}
            gap={'4px'}
            flexDirection={['column', 'row']}
          >
            <Text className={s.title}>
              {isBTCTxAddress ? 'Fractal ' : ''}Transaction
            </Text>
            <Text
              onClick={() => {
                copy(address);
                toast.success('Copied successfully!');
              }}
              as={'a'}
              className={s.txHash}
            >
              {shortCryptoAddress(address, isMobile ? 8 : 1000)}
            </Text>
          </Flex>
          {renderState()}
        </Flex>
        {isProcessing && (
          <BlockConfirm
            txBTC={txBTC}
            isFBTxAddress={isFBTxAddress}
            setIndexBlock={setIndexBlock}
            setTimeAvg={setTimeAvg}
          />
        )}

        <SimpleGrid
          width={'100%'}
          columns={[1, 2]}
          gap={{ base: '16px', md: '20px' }}
          className={s.information}
        >
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>{isProcessing ? 'First seen' : 'Timestamp'}</Text>
            <Text>
              {isProcessing ? (
                dayjs.unix(timestamp).toNow()
              ) : (
                <>
                  {dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  <Text as={'span'}> ({dayjs.unix(timestamp).toNow()})</Text>
                </>
              )}
            </Text>
          </Flex>
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Fee</Text>
            <Text display={'flex'} alignItems={'center'} gap={'12px'}>
              <TextNumberTooSmallDecimal
                value={
                  isFBTxAddress
                    ? new BigNumber(txBTC.txfee).dividedBy(1e8).toString()
                    : txBTC.txfee
                }
                isSats={true}
              />
              <Text as={'span'}>{txBTC.transaction_symbol}</Text>
              <Text color={'green'}>
                $
                {formatCurrency(
                  new BigNumber(btcPrice)
                    .multipliedBy(
                      isFBTxAddress
                        ? new BigNumber(txBTC.txfee).dividedBy(1e8)
                        : txBTC.txfee,
                    )
                    .toString(),
                )}
              </Text>
            </Text>
          </Flex>
          <Flex className={cs(s.rowItem)}>
            {isProcessing ? (
              <>
                <Text>ETA</Text>
                {processETA > 0 ? (
                  <Text>In ~ {formatCurrency(processETA, 0, 0)} mins</Text>
                ) : (
                  <Text>Not any time soon</Text>
                )}
              </>
            ) : (
              <>
                <Text>Tnx index</Text>
                <Text>{txBTC.index}</Text>
              </>
            )}
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
            {isProcessing ? (
              <></>
            ) : (
              <>
                <Text>Height</Text>
                <Text>{txBTC.height}</Text>
              </>
            )}
          </Flex>
          <Flex className={cs(s.rowItem, s.rowItemBold)}>
            <Text>Input | Output</Text>
            <Text>
              {formatCurrency(
                txBTC.input_details.reduce(
                  (p, c) =>
                    p +
                    parseFloat(
                      isFBTxAddress
                        ? new BigNumber(c.amount).dividedBy(1e8).toString()
                        : c.amount,
                    ),
                  0,
                ),
                2,
                6,
              )}{' '}
              <Text as={'span'}>{txBTC.transaction_symbol} |</Text>{' '}
              {formatCurrency(
                txBTC.output_details.reduce(
                  (p, c) =>
                    p +
                    parseFloat(
                      isFBTxAddress
                        ? new BigNumber(c.amount).dividedBy(1e8).toString()
                        : c.amount,
                    ),
                  0,
                ),
                2,
                6,
              )}{' '}
              <Text as={'span'}>{txBTC.transaction_symbol}</Text>
            </Text>
          </Flex>
        </SimpleGrid>
        <Box w={'100%'}>
          <Tabs className={s.tabTransfer}>
            <TabList>
              <Tab>BTC transfers</Tab>
              {txBTC.token_transfer.length > 0 && <Tab>Token transfers</Tab>}
            </TabList>
            <TabPanels>
              <TabPanel>
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
                    <Flex flexDirection={'column'}>
                      {txBTC.input_details.map((d, i) => (
                        <ItemTransfer
                          key={`in_${d.input_hash}_${i}`}
                          data={d}
                          symbol={txBTC.transaction_symbol}
                          address={d.input_hash}
                          tokenTransfer={txBTC.token_transfer}
                          isFBTxAddress={isFBTxAddress}
                        />
                      ))}
                    </Flex>
                    <Flex flexDirection={'column'}>
                      {txBTC.output_details.map((d, i) => (
                        <ItemTransfer
                          key={`in_${d.output_hash}_${i}`}
                          data={d}
                          symbol={txBTC.transaction_symbol}
                          address={d.output_hash}
                          tokenTransfer={txBTC.token_transfer}
                          isFBTxAddress={isFBTxAddress}
                        />
                      ))}
                    </Flex>
                  </SimpleGrid>
                </Flex>
              </TabPanel>
              {txBTC.token_transfer.length > 0 && (
                <TabPanel>
                  <TokenTransfers data={txBTC} />
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Box>
      </Center>
    </>
  );
};

export default TxBTCExplorer;
