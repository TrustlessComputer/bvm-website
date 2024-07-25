import { Flex, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

const enhanceValidateOrderID =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const params = useParams();
    const orderId = params?.id as string;

    if (!orderId || orderId.length < 1) {
      return (
        <Flex w={'100%'} h="100dvh" justify={'center'} align={'center'}>
          <Text>OrderID Not Found</Text>
        </Flex>
      );
    }
    return <WrappedComponent {...props} orderId={orderId} />;
  };

export default enhanceValidateOrderID;
