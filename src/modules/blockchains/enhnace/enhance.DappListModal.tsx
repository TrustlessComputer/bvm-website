import { useDisclosure } from '@chakra-ui/react';
import { DashboardProps, DashboardWrappedComponent } from '../Dashboard.types';
import { DappListModal } from '../components/DappListModal';
import { useAppDispatch } from '@/stores/hooks';
import { setDAppSelected } from '@/stores/states/l2services/reducer';
import { IDappItem } from '@/stores/states/l2services/types';

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
            installDappDetailOnClick={(item: IDappItem) => {
              dispatch(setDAppSelected(item));
              onOpenInstallDappDetail && onOpenInstallDappDetail();
            }}
          />
        )}
      </>
    );
  };

export default enhanceDappListModal;
