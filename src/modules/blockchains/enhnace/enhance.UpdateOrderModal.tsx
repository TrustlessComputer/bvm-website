import { useAppSelector } from '@/stores/hooks';
import { orderSelectedSelector } from '@/stores/states/l2services/selector';
import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import UpdateOrderModal from '../components/UpdateOrderModal';

const enhanceUpdateOrderModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();
    const orderDetail = useAppSelector(orderSelectedSelector);
    const { onOpenCancelOrderModal } = props;
    const {
      isOpen: isOpenUpdateOrderModal,
      onOpen: onOpenUpdateOrderModal,
      onClose: onCloseUpdateOrderModal,
    } = useDisclosure({
      id: 'UPDATE_ODER_DETAIL_MODAL',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenUpdateOrderModal={isOpenUpdateOrderModal}
          onOpenUpdateOrderModal={onOpenUpdateOrderModal}
          onCloseUpdateOrderModal={onCloseUpdateOrderModal}
        />
        {isOpenUpdateOrderModal && (
          <UpdateOrderModal
            show={isOpenUpdateOrderModal}
            item={orderDetail}
            onClose={onCloseUpdateOrderModal}
            onSuccess={() => {
              onCloseUpdateOrderModal && onCloseUpdateOrderModal();
            }}
            cancelThisRollupOnClick={() => {
              onOpenCancelOrderModal && onOpenCancelOrderModal();
            }}
          />
        )}
      </>
    );
  };

export default enhanceUpdateOrderModal;
