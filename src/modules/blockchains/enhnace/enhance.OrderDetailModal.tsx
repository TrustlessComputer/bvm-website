import { useAppSelector } from '@/stores/hooks';
import { orderSelectedSelector } from '@/stores/states/l2services/selector';
import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import BillingModal from '../components/BillingModal';
import ItemDetailModal from '../components/ItemDetailModal';

const enhanceOrderDetailModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();
    const orderDetail = useAppSelector(orderSelectedSelector);
    const {
      isOpen: isOpenOrderDetailModal,
      onOpen: onOpenOpenOrderDetailModal,
      onClose: onCloseOpenOrderDetailModal,
    } = useDisclosure({
      id: 'ODER_DETAIL_MODAL',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenOrderDetailModal={isOpenOrderDetailModal}
          onOpenOpenOrderDetailModal={onOpenOpenOrderDetailModal}
          onCloseOpenOrderDetailModal={onCloseOpenOrderDetailModal}
        />
        {isOpenOrderDetailModal && orderDetail && (
          <ItemDetailModal
            show={isOpenOrderDetailModal}
            item={orderDetail}
            onClose={onCloseOpenOrderDetailModal}
          />
        )}
      </>
    );
  };

export default enhanceOrderDetailModal;
