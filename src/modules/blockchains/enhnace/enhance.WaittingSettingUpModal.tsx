import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import WaittingSettingUpModal from '../components/WaittingSettingUpModal';

const enhanceWaittingSettingUpModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    const {
      isOpen: isOpenWaittingSetingUp,
      onOpen: onOpenWaittingSetingUp,
      onClose: onCloseWaittingSetingUp,
    } = useDisclosure({
      id: 'WAITTING_SETTING_UP_MODAL',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenWaittingSetingUp={isOpenWaittingSetingUp}
          onOpenWaittingSetingUp={onOpenWaittingSetingUp}
          onCloseWaittingSetingUp={onCloseWaittingSetingUp}
        />
        {isOpenWaittingSetingUp && (
          <WaittingSettingUpModal
            show={isOpenWaittingSetingUp}
            onClose={onCloseWaittingSetingUp}
          />
        )}
      </>
    );
  };

export default enhanceWaittingSettingUpModal;
