import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text } from '@chakra-ui/react';

interface IProps {
  item: OrderItem;
  viewPaymentOnClick?: () => void;
}

const Header = (props: IProps) => {
  const { item, viewPaymentOnClick } = props;

  return (
    <Flex
      flexDir={'row'}
      align={'center'}
      justify={'space-between'}
      mt={'20px'}
    >
      <Text
        fontSize={'32px'}
        fontWeight={700}
        color={'#1C1C1C'}
        textAlign={'left'}
      >
        Billing
      </Text>
      <Text
        px={'40px'}
        py={'12px'}
        color={'#fff'}
        h="45px"
        rounded={'1000px'}
        fontSize={'16px'}
        fontWeight={500}
        bgColor={'#FA4E0E'}
        textAlign={'center'}
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
