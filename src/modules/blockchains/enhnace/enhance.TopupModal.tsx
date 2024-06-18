import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import { useAppSelector } from '@/stores/hooks';
import {
  getL2ServicesStateSelector,
  orderSelectedSelector,
} from '@/stores/states/l2services/selector';
import TopupModal from '../components/TopupModal';

const enhanceTopUpModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();

    const { onOpenSendFormModal } = props;
    const orderDetail = useAppSelector(orderSelectedSelector);
    const { accountInforL2Service } = useAppSelector(
      getL2ServicesStateSelector,
    );

    const {
      isOpen: isOpenTopUpModal,
      onOpen: onOpenTopUpModal,
      onClose: onCloseTopUpModal,
    } = useDisclosure({
      id: 'TOPUP',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenTopUpModal={isOpenTopUpModal}
          onOpenTopUpModal={onOpenTopUpModal}
          onCloseTopUpModal={onCloseTopUpModal}
        />
        {isOpenTopUpModal && (
          <TopupModal
            show={isOpenTopUpModal}
            infor={{
              paymentAddress: accountInforL2Service?.topUpWalletAddress,
            }}
            order={orderDetail}
            onClose={onCloseTopUpModal}
            payWithNakaWalletCB={onOpenSendFormModal}
          />
        )}
      </>
    );
  };

export default enhanceTopUpModal;
