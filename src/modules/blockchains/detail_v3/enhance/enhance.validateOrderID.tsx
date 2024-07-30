import { Flex, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

const enhanceValidateOrderID = (WrappedComponent: any) => (props: any) => {
  const orderId = props.orderId;
  if (!orderId || isEmpty(orderId)) {
    return (
      <Flex w={'100%'} h="100dvh" justify={'center'} align={'center'}>
        <Text>OrderID Not Found</Text>
      </Flex>
    );
  }
  return <WrappedComponent {...props} orderId={orderId} />;
};

export default enhanceValidateOrderID;
