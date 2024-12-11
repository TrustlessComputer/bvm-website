import { useEffect } from 'react';
import { useDAServicesHelper } from '../hook/useDAServicesHelper';
import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';

const enhanceLoopFetchIssueTokenList =
  (WrappedComponent: any) => (props: any) => {
    // const { chainDetailData, orderId } = props;
    const { orderDetail } = useAppSelector(getL2ServicesStateSelector);
    const { loopFetchTokenIssueList, clearLoopFetchTokenIssueList } =
      useDAServicesHelper();

    useEffect(() => {
      // console.log('[enhanceLoopFetchIssueTokenList] useEffect START --- ', {
      //   chainID: orderDetail?.chainId,
      //   orderId: orderDetail?.orderId,
      // });
      if (orderDetail && orderDetail.chainId) {
        loopFetchTokenIssueList(orderDetail.chainId);
      } else {
        clearLoopFetchTokenIssueList();
      }

      return () => {
        console.log('[enhanceLoopFetchIssueTokenList] useEffect END --- ');
        clearLoopFetchTokenIssueList();
      };
    }, [orderDetail]);

    return <WrappedComponent {...props} />;
  };

export default enhanceLoopFetchIssueTokenList;
