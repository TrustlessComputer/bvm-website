'use client';

import { OrderItem, OrderStatus } from '@/stores/states/l2services/types';
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import sleep from '@/utils/sleep';

import s from '../styleFont.module.scss';
import { useDashboard } from '@/modules/agent-studio/providers/DashboardProvider';
import { useAppDispatch } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import CancelOrderModal from '../../../CancelOrderModal';
import l2ServicesAPI from '@/services/api/l2services';
import { fetchOrderList } from '@/stores/states/l2services/actions';
import ModalLoading from '@/components/ModalLoading';

type Props = {
  item: OrderItem;
};

const WarningSection = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { onOpenCancelOrderModal } = useDashboard();
  const hasOrderFailed = searchParams.get('hasOrderFailed');

  const {
    isOpen: isOpenLoadingModal,
    onOpen: onOpenLoadingModal,
    onToggle: onToggleLoadingModal,
    onClose: onCloseLoadingModal,
  } = useDisclosure({
    id: 'LOADING_MODAL',
  });

  const {
    isOpen: isOpenCancelOrderModal,
    onOpen: onOpenCancelOrderModal,
    onClose: onCloseCancelOrderModal,
  } = useDisclosure({
    id: 'CANCEL_ORDER_MODAL',
  });

  const cancelOrderHandler = async () => {
    try {
      onOpenLoadingModal();
      l2ServicesAPI.cancelOrder(item?.orderId!);

      await sleep(1);

      dispatch(fetchOrderList());

      await sleep(1);

      onCloseCancelOrderModal();

      // Show Toast Success
      // toast.success('Cancelled', {
      //   duration: 1000,
      // });

      sleep(1);

      router.back();
    } catch (error) {
      // const { message } = getErrorMessage(error);
      // toast.error(message);
    } finally {
      onCloseLoadingModal();
    }
  };

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
            onClick={(event: any) => {
              if (event.stopPropagation) event.stopPropagation();
              // dispatch(setOrderSelected(item));
              // onOpenCancelOrderModal && onOpenCancelOrderModal();
              onOpenCancelOrderModal();
            }}
          >
            cancel the order
          </Text>{' '}
          to create a new one.
        </Text>

        {isOpenCancelOrderModal && (
          <CancelOrderModal
            item={item!}
            show={isOpenCancelOrderModal}
            onClose={onCloseCancelOrderModal}
            onSuccess={() => {
              cancelOrderHandler();
            }}
          />
        )}
        {isOpenLoadingModal && (
          <ModalLoading
            show={isOpenLoadingModal}
            onClose={onCloseLoadingModal}
          />
        )}
      </Flex>
    );
  return null;
};

export default WarningSection;
