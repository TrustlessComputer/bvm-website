import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Flex, Text } from '@chakra-ui/react';
import { ChainDetailComponent, ChainDetailComponentProps } from '../types';

const enhanceValidateOrderData =
  (WrappedComponent: ChainDetailComponent) =>
  (props: ChainDetailComponentProps) => {
    const { orderDetail } = useAppSelector(getL2ServicesStateSelector);

    if (!orderDetail || orderDetail.orderId?.length < 1) {
      return (
        <Flex
          flexDir={'column'}
          w={'100%'}
          h="100dvh"
          justify={'center'}
          align={'center'}
        >
          <Text color={'#000'} fontSize={['20px']} fontWeight={600}>
            Page Not Found
          </Text>
          <Text color={'#000'} fontSize={['20px']} fontWeight={600}>
            Code: [1001]
          </Text>
        </Flex>
      );
    }
    return <WrappedComponent {...props} chainDetailData={orderDetail} />;
  };

export default enhanceValidateOrderData;
