import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { setOrderSelected } from '@/stores/states/l2services/reducer';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

const enhanceValidateOrderData = (WrappedComponent: any) => (props: any) => {
  const dispatch = useAppDispatch();
  const { orderDetail } = useAppSelector(getL2ServicesStateSelector);

  useEffect(() => {
    if (orderDetail) {
      dispatch(setOrderSelected(orderDetail));
    }
  }, [orderDetail]);

  if (!orderDetail || orderDetail.orderId?.length < 1) {
    // OrderDetail is null or OrderDetail invalid data
    return (
      <Flex
        flexDir={'column'}
        w={'100%'}
        h="100dvh"
        justify={'center'}
        align={'center'}
      >
        <Text color={'#000'} fontSize={['20px']} fontWeight={600}>
          Page Not Found.
        </Text>

        <Text color={'#000'} fontSize={['20px']} fontWeight={600}>
          {/* Order Data is invalid data */}
          {`Code: [1001]`}
        </Text>
      </Flex>
    );
  }

  return <WrappedComponent {...props} chainDetailData={orderDetail} />;
};

export default enhanceValidateOrderData;
