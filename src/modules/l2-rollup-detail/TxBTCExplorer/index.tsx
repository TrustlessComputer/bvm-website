import { Box, Center, Flex, SimpleGrid, Tag, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { formatCurrency } from '@/utils/format';
import { labelAmountOrNumberAdds } from '@/utils/string';
import Loading from '@/components/Loading';
import s from './styles.module.scss';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import cs from 'classnames';

const TxBTCExplorer = () => {
  const {
    address,
    isValidAddress,
    isBTCAddress,
    totalBalanceUsd,
    totalBitcoinBalanceUsd,
    isBTCTxAddress,
  } = useContext(L2RollupDetailContext);
  const [loading, setLoading] = useState(true);
  const [txBTC, setTxBTC] = useState<ITxBTC>();

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
                toast.success('Copied successully!');
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
              {dayjs.unix(txBTC.transaction_time).format('YYYY-MM-DD HH:mm:ss')}
              <Text as={'span'}>
                ({dayjs.unix(txBTC.transaction_time).toNow()})
              </Text>
            </Text>
          </Flex>
        </SimpleGrid>
      </Center>
    </>
  );
};

export default TxBTCExplorer;
