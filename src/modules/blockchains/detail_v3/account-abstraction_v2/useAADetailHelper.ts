import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import { useAppSelector } from '@/stores/hooks';
import { getOrderDetailSelected } from '@/stores/states/l2services/selector';
import { useMemo } from 'react';

export const useAADetailHelper = () => {
  const { orderDetail } = useAppSelector(getOrderDetailSelected);
  const { l2ServiceUserAddress } = useWeb3Auth();

  const result = useMemo(() => {
    let isCanEdit = true;
    let isOnlyView = false;
    let isProcessing = false;
    let isOwner =
      l2ServiceUserAddress?.toLowerCase() ===
      orderDetail?.tcAddress?.toLowerCase();

    if (!orderDetail || !orderDetail.dApps || orderDetail.dApps.length < 1) {
    } else {
      const findedAA = orderDetail.dApps.find(
        (item) => item.appCode === 'account_abstraction',
      );

      if (findedAA) {
        if (findedAA.status === 'new' || findedAA.status === 'processing') {
          isCanEdit = false;
          isOnlyView = false;
          isProcessing = true;
        } else if (findedAA.status === 'done') {
          isCanEdit = false;
          isProcessing = false;
          isOnlyView = true;
        }
      }
    }

    return {
      orderDetail,
      isCanEdit: true,
      isOnlyView,
      isProcessing: false,
      isOwner,
    };
  }, [orderDetail, l2ServiceUserAddress]);

  return result;
};
