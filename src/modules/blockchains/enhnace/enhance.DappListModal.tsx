import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import { DappListModal } from '../components/DappListModal';
import { IDappDetail } from '../components/DappListModal/constants';
import { useAppDispatch } from '@/stores/hooks';
import { setDappNeedInstallSelected } from '@/stores/states/l2services/reducer';

const enhanceDappListModal =
  (WrappedComponent: DashboardWrappedComponent) => (props: DashboardProps) => {
    const {
      isOpen: isOpenDappList,
      onOpen: onOpenDappList,
      onClose: onCloseDappList,
    } = useDisclosure({
      id: 'DAPPS_LIST_MODAL',
    });

    const dispatch = useAppDispatch();
    const { onOpenInstallDappDetail } = props;

    return (
      <>
        <WrappedComponent
          {...props}
          isOpenDappList={isOpenDappList}
          onOpenDappList={onOpenDappList}
          onCloseDappList={onCloseDappList}
        />
        {isOpenDappList && (
          <DappListModal
            show={isOpenDappList}
            onClose={onCloseDappList}
            installDappDetailOnClick={(item: IDappDetail) => {
              dispatch(setDappNeedInstallSelected(item));
              onOpenInstallDappDetail && onOpenInstallDappDetail();
            }}
          />
        )}
      </>
    );
  };

export default enhanceDappListModal;
