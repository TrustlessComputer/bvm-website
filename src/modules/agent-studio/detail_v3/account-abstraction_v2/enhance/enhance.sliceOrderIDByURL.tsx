import { useEffect, useState } from 'react';

const enhanceSliceOrderIDByURL = (WrappedComponent: any) => (props: any) => {
  const [isProcessing, setProcessing] = useState(true);
  const [orderId, setOrderId] = useState<undefined | string>(undefined);

  useEffect(() => {
    setProcessing(true);
    const location = window.location.pathname;
    if (!location || location.length < 1) {
      setOrderId(undefined);
    } else {
      //Split URL by character "/"
      const stringArray = location.split('/');

      //Get orderID at index length -2
      const orderIDStr = stringArray[stringArray.length - 2];

      //Set State
      setOrderId(orderIDStr);
    }

    setProcessing(false);
  }, []);

  if (isProcessing) return null;
  return <WrappedComponent {...props} orderId={orderId} />;
};

export default enhanceSliceOrderIDByURL;
