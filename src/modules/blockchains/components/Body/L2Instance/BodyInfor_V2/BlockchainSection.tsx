'use client';

import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import ColumnInfor from './ColumnInfor';
import s from '../styleFont.module.scss';
import { convertSecondsToHours } from '@/modules/blockchains/feat/customize/Buy.helpers';
import { formatCurrencyV2 } from '@/utils/format';
import { useMemo } from 'react';
import { RollupEnum } from '@/modules/blockchains/feat/customize/Buy.constanst';

type Props = {
  item: OrderItem;
};

const BlockchainSection = (props: Props) => {
  const { item } = props;
  const mapper = useOrderMapper(item);
  const {
    finalizationPeriod,
    gasLimit,
    rpc,
    prover,
    explorer,
    chainId,
    serviceType,
    blockTime,
  } = item;

  const formatWithdrawalPeriod = useMemo(() => {
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
        fontSize={['16px', '18px', '20px']}
        fontWeight={600}
        color={'#000'}
        className={s.fontSFProDisplay}
      >
        {'Blockchain'}
      </Text>

      <SimpleGrid
        columns={[3]}
        spacing={['5px', '10px', '20px']}
        width={'100%'}
      >
        <ColumnInfor
          title="Data availability"
          content={`${mapper.dataAvailabilityLayer || ''}`}
        />
        {item.serviceType === RollupEnum.Rollup_ZK && (
          <ColumnInfor
            title="ZK Prover"
            content={`${prover === 1 ? 'Yes' : 'No'}`}
          />
        )}
        {item.serviceType !== RollupEnum.Rollup_ZK && (
          <ColumnInfor
            title="Block Time"
            content={`${
              Number(blockTime) === 1 ? '1 second' : `${blockTime} seconds`
            }`}
          />
        )}
        <ColumnInfor title="Chain ID" content={`${chainId || '--'}`} />
      </SimpleGrid>
      <SimpleGrid
        columns={[1, 2, 3]}
        spacing={['5px', '10px', '20px']}
        width={'100%'}
      >
        <ColumnInfor
          title="RPC"
          content={`${rpc || 'Pending payment'}`}
          isPendingPayment={!rpc}
          isLink={!!rpc}
        />
        <ColumnInfor
          title="Block explorer"
          content={`${explorer || 'Pending payment'}`}
          isPendingPayment={!explorer}
          isLink={!!explorer}
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
