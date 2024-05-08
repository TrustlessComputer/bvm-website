import { useAppSelector } from '@/stores/hooks';
import { getL2ServicesStateSelector } from '@/stores/states/l2services/selector';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';

interface IProps {
  item: OrderItem;
}

const BalanceInfor = (props: IProps) => {
  const { item } = props;

  const { accountInforL2Service } = useAppSelector(getL2ServicesStateSelector);

  return (
    <Flex flex={1} flexDir={'row'} align={'center'} mt="20px">
      <Flex flex={1} flexDir={'column'} align={'center'} justify={'center'}>
        <Text
          fontSize={'32px'}
          fontWeight={600}
          color={'#00AA6C'}
          textAlign={'right'}
        >
          {`${accountInforL2Service?.balanceFormatted || 0} BVM`}
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={'#000'}
          opacity={0.7}
          textAlign={'left'}
        >
          {'Your Usage'}
        </Text>
      </Flex>
      {/* <Flex flex={1} flexDir={'column'} align={'center'} justify={'center'}>
        <Text
          fontSize={'32px'}
          fontWeight={600}
          color={'#FF4747'}
          textAlign={'right'}
        >
          {'100 BVM'}
        </Text>
        <Text
          fontSize={'14px'}
          fontWeight={400}
          color={'#000'}
          opacity={0.7}
          textAlign={'left'}
        >
          {'Your Usage'}
        </Text>
      </Flex> */}
    </Flex>
  );
};

export default BalanceInfor;
