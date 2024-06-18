'use client';

import { Button, Flex, Image, Text } from '@chakra-ui/react';
import LivingStatus from './LivingStatus';
import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
  depositOnClick?: () => void;
};

const HeaderRow = (props: Props) => {
  const { item, isOwner, depositOnClick } = props;
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
          {mapper.status || ''}
        </Text>
        {item?.status === OrderStatus.WaitingPayment && (
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={'100px'}
            h={'54px'}
            minW={'140px'}
            fontSize={'16px'}
            fontWeight={500}
            onClick={(event) => {
              if (event.stopPropagation) event.stopPropagation();
              depositOnClick && depositOnClick();
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Deposit
          </Button>
        )}
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
          {`${
            mapper.computerIndexer || `ZK-powered Blockchain #${item.index}`
          }`}
        </Text>
      </Flex>

      {renderStatus()}
    </Flex>
  );
};

export default HeaderRow;
