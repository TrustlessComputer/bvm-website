import { useAppSelector } from '@/stores/hooks';
import { orderSelectedSelector } from '@/stores/states/l2services/selector';
import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import EditConfigModal from '../components/EditConfigModal';

const enhanceEditConfigModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    // const dispatch = useAppDispatch();
    const orderDetail = useAppSelector(orderSelectedSelector);

    const {
      isOpen: isOpenEditConfigModal,
      onOpen: onOpenEditConfigModal,
      onClose: onCloseEditConfigModal,
    } = useDisclosure({
      id: 'EDIT_CONFIG',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenEditConfigModal={isOpenEditConfigModal}
          onOpenEditConfigModal={onOpenEditConfigModal}
          onCloseEditConfigModal={onCloseEditConfigModal}
        />
        {isOpenEditConfigModal && (
          <EditConfigModal
            item={orderDetail}
            show={isOpenEditConfigModal}
            onClose={onCloseEditConfigModal}
            onSuccess={onCloseEditConfigModal}
          />
        )}
      </>
    );
  };

export default enhanceEditConfigModal;
