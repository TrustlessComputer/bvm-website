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
  const { tracking } = useL2ServiceTracking();

  const isWaittingOrSettingUp =
    item.status === OrderStatus.WaitingPayment ||
    item.status === OrderStatus.Processing;

  const renderRightView = () => {
    return (
      <Flex
        w={isWaittingOrSettingUp ? '100%' : 'max-content'}
        flexDir={'row'}
        align={'center'}
        justify={['space-between', 'space-between', 'flex-end']}
        gap={'10px'}
      >
        <Flex flexDir={'row'} align={'center'} gap={'10px'}>
          <LivingStatus color={mapper.color || 'transparent'} />
          <Text
            fontSize={['16px', '18px', '20px']}
            fontWeight={500}
            color={mapper.color || 'transparent'}
          >
            {mapper.status || ''}
          </Text>
        </Flex>

        {item?.status === OrderStatus.WaitingPayment && (
          <Button
            bgColor={'#FA4E0E'}
            color={'#fff'}
            borderRadius={'100px'}
            h={['40px', '45px', '54px']}
            minW={['100px', '120px', '140px']}
            fontSize={['14px', '15px', '16px']}
            fontWeight={500}
            onClick={(event) => {
              if (event.stopPropagation) event.stopPropagation();
              tracking('PAYNOW');
              depositOnClick && depositOnClick();
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            Pay now
          </Button>
        )}
      </Flex>
    );
  };

  const renderLeftView = () => {
    return (
      <Flex
        flexDir={'row'}
        gap={'12px'}
        align={'center'}
        w={isWaittingOrSettingUp ? '100%' : '100%'}
        // bgColor={'red'}
        justify={isWaittingOrSettingUp ? 'flex-start' : 'space-between'}
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

  let flexDrirection: any[] = isWaittingOrSettingUp
    ? ['column', 'column', 'row']
    : ['row', 'row', 'row'];

  return (
    <Flex
      flexDir={flexDrirection}
      align={'center'}
      justify={'space-between'}
      gap={'10px'}
      w={'100%'}
      // bgColor={'green'}
    >
      {renderLeftView()}
      {renderRightView()}
    </Flex>
  );
};

export default HeaderRow;
