import { Box, Center, Flex, Tag, Text } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { L2RollupDetailContext } from '../providers/l2-rollup-detail-context';
import CRollupL2DetailBitcoinAPI from '@/services/api/dapp/rollupl2-detail-bitcoin';
import { ITxBTC } from '@/services/api/dapp/rollupl2-detail-bitcoin/interface';
import { formatCurrency } from '@/utils/format';
import { labelAmountOrNumberAdds } from '@/utils/string';
import Loading from '@/components/Loading';
import s from './styles.module.scss';

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
      <Flex
        mt={{ base: '28px', md: '36px' }}
        gap={{ base: '16px', md: '20px' }}
        direction={'row'}
        alignItems={'center'}
      >
        <Flex
          className={s.topHeader}
          w={'100%'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Flex alignItems={'flex-end'} gap={'4px'}>
            <Text className={s.title}>Transaction</Text>
            <Text as={'a'} className={s.txHash}>
              {address}
            </Text>
          </Flex>
          <Tag className={s.tagConfirm}>
            {formatCurrency(txBTC?.confirm, 0, 2)} confirmation
            {labelAmountOrNumberAdds(txBTC?.confirm || 0)}
          </Tag>
        </Flex>
      </Flex>
    </>
  );
};

export default TxBTCExplorer;
