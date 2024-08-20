import { useEffect } from 'react';
import { useFetchOrderTimer } from '../hook/useFetchOrderTimer';

const enhanceLoopFetchOrder = (WrappedComponent: any) => (props: any) => {
  const { orderId } = props;

  const { loopFetchChainInfor, clearIntervalTimer } = useFetchOrderTimer(
    orderId!,
  );

  useEffect(() => {
    // console.log('--- enhanceExtractOrderID useEffect START --- ');
    loopFetchChainInfor();
    return () => {
      // console.log('--- enhanceExtractOrderID useEffect END --- ');
      clearIntervalTimer();
    };
  }, []);

  return <WrappedComponent {...props} />;
};

export default enhanceLoopFetchOrder;
