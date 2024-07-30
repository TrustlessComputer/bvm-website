import { useParams } from 'next/navigation';

const enhanceExtractOrderID = (WrappedComponent: any) => (props: any) => {
  const params = useParams();
  const orderId = params?.id as string;
  return <WrappedComponent {...props} orderId={orderId} />;
};

export default enhanceExtractOrderID;
