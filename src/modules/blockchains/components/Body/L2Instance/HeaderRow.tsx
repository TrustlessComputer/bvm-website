'use client';

import { Flex, Image, Text } from '@chakra-ui/react';
import LivingStatus from './LivingStatus';
import { OrderItem } from '@/stores/states/l2services/types';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
};

const HeaderRow = (props: Props) => {
  const { item, isOwner } = props;
  const mapper = useOrderMapper(item);

  const renderStatus = () => {
    return (
      <Flex flexDir={'row'} align={'center'} gap={'20px'}>
        <LivingStatus color={mapper.color || 'transparent'} />
        <Text
          fontSize={'20px'}
          fontWeight={500}
          color={mapper.color || 'transparent'}
        >
          Healthy
        </Text>
      </Flex>
    );
  };

  return (
    <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
      <Flex flexDir={'row'} gap={'10px'}>
        <Image
          src={'/blockchains/customize/ic-infa.svg'}
          w={'40px'}
          h={'auto'}
          objectFit={'contain'}
        />
        <Text fontSize={'25px'} fontWeight={500} color={'#000'}>
          {`${mapper.computerIndexer || `Bitcoin L2 #${item.index}`}`}
        </Text>
      </Flex>

      {renderStatus()}
    </Flex>
  );
};

export default HeaderRow;
