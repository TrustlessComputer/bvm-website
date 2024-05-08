import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';

interface IProps {
  item: OrderItem;
  viewPaymentOnClick?: () => void;
}

const Header = (props: IProps) => {
  const { item, viewPaymentOnClick } = props;

  return (
    <Flex flexDir={'row'} align={'center'} justify={'space-between'}>
      <Text
        mt={'20px'}
        fontSize={'32px'}
        fontWeight={700}
        color={'#1C1C1C'}
        textAlign={'left'}
      >
        Billing
      </Text>
      <Text
        mt={'20px'}
        fontSize={'20px'}
        fontWeight={400}
        color={'#0A00B3'}
        textAlign={'right'}
        onClick={viewPaymentOnClick}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
      >
        Topup
      </Text>
    </Flex>
  );
};

export default Header;
