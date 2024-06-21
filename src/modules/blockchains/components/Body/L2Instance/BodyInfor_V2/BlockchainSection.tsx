'use client';

import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ColumnInfor from './ColumnInfor';
import s from '../styleFont.module.scss';
import { convertSecondsToHours } from '@/modules/blockchains/Buy/Buy.helpers';
import { formatCurrencyV2 } from '@/utils/format';
import { useMemo } from 'react';

type Props = {
  item: OrderItem;
};

const BlockchainSection = (props: Props) => {
  const { item } = props;
  const mapper = useOrderMapper(item);
  const { finalizationPeriod, gasLimit, rpc, prover, explorer, chainId } = item;

  const formatWithdrawalPeriod = useMemo(() => {
    if (!finalizationPeriod) return '--';
    const hours = convertSecondsToHours(Number(finalizationPeriod));

    if (hours !== 1) {
      return `${hours} hours`;
    } else {
      return `${hours} hour`;
    }
  }, [finalizationPeriod]);

  return (
    <Flex
      bgColor={'#F6F6F6'}
      p="20px"
      gap={'12px'}
      borderRadius={'8px'}
      flexDir={'column'}
    >
      <Text
        fontSize={'20px'}
        lineHeight={'28px'}
        fontWeight={600}
        color={'#000'}
        className={s.fontSFProDisplay}
      >
        {'Blockchain'}
      </Text>

      <SimpleGrid columns={[3]} spacing="20px" width={'100%'}>
        <ColumnInfor
          title="Data availability"
          content={`${mapper.dataAvailabilityLayer || ''}`}
        />
        <ColumnInfor
          title="Zk Prover"
          content={`${prover === 1 ? 'Yes' : 'No'}`}
        />
        {/* <ColumnInfor
          title="Max block gas limit"
          content={`${
            `${formatCurrencyV2({
              amount: gasLimit || 0,
              decimals: 0,
            })}` || '--'
          }`}
        /> */}
        <ColumnInfor title="Chain ID" content={`${chainId || '--'}`} />
        <ColumnInfor title="RPC URL" content={`${rpc || 'Pending payment'}`} />
        <ColumnInfor
          title="Block explorer URL"
          content={`${explorer || 'Pending payment'}`}
        />
        <ColumnInfor
          title="Withdrawal period"
          content={`${formatWithdrawalPeriod || '--'}`}
        />
      </SimpleGrid>
    </Flex>
  );
};

export default BlockchainSection;
