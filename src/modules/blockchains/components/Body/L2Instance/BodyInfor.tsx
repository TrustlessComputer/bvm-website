'use client';

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
        gap={'30px'}
        align={'center'}
        justify={'space-between'}
      >
        <Text w={'50%'} fontSize={'16px'} fontWeight={600} color={'#000'}>
          {label}
        </Text>
        <Text w={'50%'} fontSize={'16px'} fontWeight={400} color={'#4d4c4c'}>
          {content}
        </Text>
      </Flex>
    );
  };

  return (
    <SimpleGrid columns={2} spacing="20px" width={'100%'} height={'auto'}>
      {renderRowInFor('Name', `${item.chainName || ''}`)}
      {renderRowInFor(
        'Network type',
        `${item.isMainnet ? 'Bitcoin Mainnet' : 'Bitcoin Testnet'}`,
      )}
      {renderRowInFor('Block time', `${mapper.blockTime || ''}`)}
      {renderRowInFor('Deployer', `${mapper.deployer}`)}
      {renderRowInFor(
        'Data availability layer',
        `${mapper.dataAvailabilityLayer || ''}`,
      )}
      {renderRowInFor(
        'Launch data',
        `${formatUnixDateTime({
          dateTime: item.createAt,
          formatPattern: 'MMMM DD, YYYY',
        })}`,
      )}
    </SimpleGrid>
  );
};

export default BodyInfor;
