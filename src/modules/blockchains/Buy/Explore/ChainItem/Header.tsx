import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Image } from '@chakra-ui/react';
import React, { useMemo } from 'react';

type Props = {
  orderItem?: OrderItem;
};

const Header = (props: Props) => {
  const { orderItem } = props;

  const chainNameFormated = useMemo(() => {
    const chainName = orderItem?.chainName || '';
    return chainName.toLowerCase()?.trim().replaceAll('-', ' ');
  }, [orderItem?.chainName]);

  return (
    <Flex flexDir={'row'} gap={['20px']} align={'flex-start'} w={'100%'}>
      <Image
        src={orderItem?.logoURL || '/blockchains/customize/ic-infa.svg'}
        w={['80px']}
        h={['80px']}
        fit={'cover'}
        borderRadius={'100%'}
      />
      <Flex flexDir={'column'} gap={['8px']}>
        <Text
          fontSize={['24px']}
          fontWeight={500}
          color={'#000'}
          textTransform={'capitalize'}
        >
          {`${chainNameFormated}`}
        </Text>
        <Text
          fontSize={['16px']}
          fontWeight={400}
          color={'#000'}
          opacity={0.7}
          overflow={'hidden'}
          whiteSpace={'wrap'}
          maxH={'50px'}
          w={'100%'}
          textOverflow={'ellipsis'}
        >
          {`${orderItem?.description || ''}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Header;
