'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import s from '../styleFont.module.scss';
import { useDashboard } from '@/modules/blockchains/providers/DashboardProvider';
import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';

type Props = {
  item: OrderItem;
};

const WarningSection = (props: Props) => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { onOpenCancelOrderModal } = useDashboard();
  const hasOrderFailed = searchParams.get('hasOrderFailed');

  const { item } = props;
  const isWaittingForPayment = item?.status === OrderStatus.WaitingPayment;

  if (isWaittingForPayment)
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
          fontSize={['14px', '18px', '20px']}
          fontWeight={300}
          className={s.fontSFProDisplay}
          color={'#F19100'}
          textAlign={'center'}
        >
          You have a pending payment for an order. Please complete the payment
          or{' '}
          <Text
            as={'span'}
            className={s.fontSFProDisplay}
            textDecorationLine={'underline'}
            textUnderlineOffset={'2px'}
            textDecorationThickness={'1px'}
            color={'#2c04f5'}
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            onClick={() => {
              dispatch(setOrderSelected(item));
              onOpenCancelOrderModal && onOpenCancelOrderModal();
            }}
          >
            cancel the order
          </Text>{' '}
          to create a new one.
        </Text>
      </Flex>
    );
  return null;
};

export default WarningSection;
