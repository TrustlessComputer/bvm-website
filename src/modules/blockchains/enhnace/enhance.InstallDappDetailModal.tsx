import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import { AccountAbstractionDAppModal } from '../components/DAppModal';

const enhanceInstallDappDetailModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    const {
      isOpen: isOpenInstallDappDetail,
      onOpen: onOpenInstallDappDetail,
      onClose: onCloseInstallDappDetail,
    } = useDisclosure({
      id: 'INSTALL_DAPPS_DETAIL_MODAL',
    });

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenInstallDappDetail={isOpenInstallDappDetail}
          onOpenInstallDappDetail={onOpenInstallDappDetail}
          onCloseInstallDappDetail={onCloseInstallDappDetail}
        />
        {isOpenInstallDappDetail && (
          <AccountAbstractionDAppModal
            show={isOpenInstallDappDetail}
            onClose={onCloseInstallDappDetail}
          />
        )}
      </>
    );
  };

export default enhanceInstallDappDetailModal;
