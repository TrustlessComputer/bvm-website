import ModalLoading from '@/components/ModalLoading';
import l2ServicesAPI from '@/services/api/l2services';
import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { fetchOrderList } from '@/stores/states/l2services/actions';
import { orderSelectedSelector } from '@/stores/states/l2services/selector';
import { getErrorMessage } from '@/utils/errorV2';
import sleep from '@/utils/sleep';
import { useDisclosure } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import CancelOrderModal from '../components/CancelOrderModal';

const enhanceCancelOrderModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    const dispatch = useAppDispatch();
    const orderDetail = useAppSelector(orderSelectedSelector);

    const {
      isOpen: isOpenCancelOrderModal,
      onOpen: onOpenCancelOrderModal,
      onClose: onCloseCancelOrderModal,
    } = useDisclosure({
      id: 'CANCEL_ORDER_MODAL',
    });

    const {
      isOpen: isOpenLoadingModal,
      onOpen: onOpenLoadingModal,
      onToggle: onToggleLoadingModal,
      onClose: onCloseLoadingModal,
    } = useDisclosure({
      id: 'LOADING_MODAL',
    });

    const cancelOrderHandler = async () => {
      try {
        onOpenLoadingModal();
        l2ServicesAPI.cancelOrder(orderDetail?.orderId!);

        await sleep(1);

        dispatch(fetchOrderList());

        await sleep(1);

        onCloseCancelOrderModal();

        // Show Toast Success
        toast.success('Cancelled', {
          duration: 1000,
        });
      } catch (error) {
        const { message } = getErrorMessage(error);
        toast.error(message);
      } finally {
        onCloseLoadingModal();
      }
    };

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenCancelOrderModal={isOpenCancelOrderModal}
          onOpenCancelOrderModal={onOpenCancelOrderModal}
          onCloseCancelOrderModal={onCloseCancelOrderModal}
        />
        {isOpenCancelOrderModal && (
          <CancelOrderModal
            item={orderDetail}
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
      </>
    );
  };

export default enhanceCancelOrderModal;
