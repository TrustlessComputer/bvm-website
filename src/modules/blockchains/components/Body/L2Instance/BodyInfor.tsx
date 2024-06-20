'use client';

import { RollupEnumMap } from '@/modules/blockchains/Buy/Buy.constanst';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { OrderItem } from '@/stores/states/l2services/types';
import { formatUnixDateTime } from '@/utils/time';
import { Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const BodyInfor = (props: Props) => {
  const { item, isOwner } = props;
  const mapper = useOrderMapper(item);
  const renderRowInFor = (label: string, content: string) => {
    return (
      <Flex
        flexDir={'row'}
        gap={'20px'}
        align={'center'}
        justify={'space-between'}
      >
        <Text
          w={'40%'}
          fontSize={'16px'}
          fontWeight={600}
          color={'#000'}
          textAlign={'left'}
        >
          {label}
        </Text>
        <Text
          w={'60%'}
          fontSize={'16px'}
          fontWeight={400}
          color={'#4d4c4c'}
          textAlign={'right'}
        >
          {content}
        </Text>
      </Flex>
    );
  };

  return (
    <SimpleGrid
      columns={2}
      spacing="20px"
      width={'100%'}
      height={'auto'}
      spacingX={'200px'}
    >
      {renderRowInFor('Rollup ID', `${mapper.computerIndexer || ''}`)}
      {!mapper.isLayer1 &&
        renderRowInFor(
          'Rollup protocol',
          `${RollupEnumMap[item.serviceType] || '--'}`,
        )}
      {renderRowInFor('Block time', `${mapper.blockTime || ''}`)}
      {renderRowInFor(
        'Data availability',
        `${mapper.dataAvailabilityLayer || ''}`,
      )}
      {renderRowInFor('Chain ID', `${item.chainId || '--'}`)}
      {renderRowInFor('RPC URL', `${item.rpc || 'Pending payment'}`)}
      {renderRowInFor(
        'Native token',
        `${item.preMint === 0 ? 'BVM' : item.ticker || '--'}`,
      )}
      {renderRowInFor(
        'Block explorer URL',
        `${item.explorer || 'Pending payment'}`,
      )}

      {renderRowInFor('Deployer', `${mapper.deployer || '--'}`)}

      {renderRowInFor(
        'Launch date',
        `${formatUnixDateTime({
          dateTime: item.createAt,
          formatPattern: 'MMMM DD, YYYY',
        })}`,
      )}
    </SimpleGrid>
  );
};

export default BodyInfor;
