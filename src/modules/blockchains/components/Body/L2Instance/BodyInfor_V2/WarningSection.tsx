'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import s from '../styleFont.module.scss';

type Props = {
  item: OrderItem;
};

const WarningSection = (props: Props) => {
  const searchParams = useSearchParams();
  const hasOrderFailed = searchParams.get('hasOrderFailed');

  const { item } = props;
  const isWaittingForPayment = item?.status === OrderStatus.WaitingPayment;

  if (isWaittingForPayment && hasOrderFailed === 'true')
    return (
      <Flex
        bgColor={'#fff'}
        borderRadius={'8px'}
        align={'center'}
        justify={'center'}
        p="8px"
        borderWidth={'1px'}
        borderColor={'#F19100'}
        gap={'10px'}
        minH={'44px'}
      >
        <Text
          fontSize={'20px'}
          lineHeight={'28px'}
          fontWeight={300}
          className={s.fontSFProDisplay}
          color={'#F19100'}
        >
          You have a pending payment for an order. Please complete the payment
          or cancel the order to create a new one.
        </Text>
      </Flex>
    );
  return null;
};

export default WarningSection;
