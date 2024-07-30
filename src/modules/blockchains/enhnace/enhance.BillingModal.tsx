import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import BillingModal from '../components/BillingModal';
import { useAppSelector } from '@/stores/hooks';
import { orderSelectedSelector } from '@/stores/states/l2services/selector';

const enhanceBillingModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();
    const orderDetail = useAppSelector(orderSelectedSelector);
    const { onOpenTopUpModal } = props;
    const {
      isOpen: isOpenBillingModal,
      onOpen: onOpenBillingModal,
      onClose: onCloseBillingModal,
    } = useDisclosure({
      id: 'BILLING',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenBillingModal={isOpenBillingModal}
          onOpenBillingModal={onOpenBillingModal}
          onCloseBillingModal={onCloseBillingModal}
        />
        {isOpenBillingModal && (
          <BillingModal
            show={isOpenBillingModal}
            item={orderDetail}
            viewPaymentOnClick={onOpenTopUpModal}
            onClose={onCloseBillingModal}
            onSuccess={async () => {}}
          />
        )}
      </>
    );
  };

export default enhanceBillingModal;
