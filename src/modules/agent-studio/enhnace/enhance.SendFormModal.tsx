import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import SendFormModal from '../components/SendFormModal';

const enhanceSendFormModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();
    // const { accountInforL2Service } = useAppSelector(
    //   getL2ServicesStateSelector,
    // );
    const {
      isOpen: isOpenSendFormModal,
      onOpen: onOpenSendFormModal,
      onClose: onCloseSendFormModal,
    } = useDisclosure({
      id: 'SEND_FORM',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenSendFormModal={isOpenSendFormModal}
          onOpenSendFormModal={onOpenSendFormModal}
          onCloseSendFormModal={onCloseSendFormModal}
        />
        {isOpenSendFormModal && (
          <SendFormModal
            show={isOpenSendFormModal}
            onClose={onCloseSendFormModal}
            onSuccess={onCloseSendFormModal}
          />
        )}
      </>
    );
  };

export default enhanceSendFormModal;
