'use client';

import { Button, Flex, Image, ResponsiveArray, Text } from '@chakra-ui/react';
import LivingStatus from './LivingStatus';
import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { useL2ServiceTracking } from '@/hooks/useL2ServiceTracking';

type Props = {
  item: OrderItem;
  isOwner?: boolean;
  depositOnClick?: () => void;
  editOnClick?: () => void;
};

const HeaderRow = (props: Props) => {
  const { item, isOwner, depositOnClick, editOnClick } = props;
  const mapper = useOrderMapper(item);

  const isShowStatus =
    item.status === OrderStatus.Started ||
    item.status === OrderStatus.Processing;

  const renderLeftView = () => {
    return (
      <Flex
        flex={1}
        flexDir={'row'}
        gap={'12px'}
        align={'center'}
        w={'100%'}
        justify={'flex-start'}
      >
        <Flex flexDir={'row'} align={'center'} gap={'12px'}>
          {item.logoURL ? (
            <Image
              src={`${item.logoURL}`}
              w={['28px', '35px', '40px']}
              borderRadius={'4px'}
              h={'auto'}
              objectFit={'contain'}
            />
          ) : (
            <Image
              src={'/blockchains/customize/ic-infa.svg'}
              w={['28px', '35px', '40px']}
              h={'auto'}
              objectFit={'contain'}
            />
          )}
          <Text
            fontSize={['20px', '22px', '25px']}
            fontWeight={500}
            color={'#000'}
          >
            {`${item.chainName || '--'}`}
          </Text>
        </Flex>

        {item.status === OrderStatus.WaitingPayment && (
          <Image
            src={`/icons/pencil_edit_grey.svg`}
            fit={'contain'}
            maxW={'24px'}
            maxH={'24px'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={(event: any) => {
              if (event.stopPropagation) event.stopPropagation();
              editOnClick && editOnClick();
            }}
          />
        )}
      </Flex>
    );
  };

  const renderRightView = () => {
    if (!isShowStatus) return null;
    return (
      <Flex
        flex={1}
        flexDir={'row'}
        align={'center'}
        gap={'10px'}
        justify={'flex-end'}
      >
        <LivingStatus color={mapper.color || 'transparent'} />
        <Text
          fontSize={['16px', '18px', '20px']}
          fontWeight={500}
          color={mapper.color || 'transparent'}
        >
          {mapper.status || ''}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex
      flexDir={['column', 'column', 'row']}
      align={'center'}
      justify={'space-between'}
      gap={'10px'}
      w={'100%'}
    >
      {renderLeftView()}
      {renderRightView()}
    </Flex>
  );
};

export default HeaderRow;
