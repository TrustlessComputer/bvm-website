import { IExploreItem } from '@/services/api/l2services/types';
import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Text, Image } from '@chakra-ui/react';
import React, { useMemo } from 'react';

type Props = {
  orderItem?: IExploreItem;
};

const Header = (props: Props) => {
  const { orderItem } = props;

  const chainNameFormated = useMemo(() => {
    const chainName = orderItem?.chainInfo?.name || '';
    return chainName?.trim();
  }, [orderItem?.chainInfo]);

  const description = orderItem?.chainInfo?.description;

  return (
    <Flex
      flexDir={'row'}
      gap={['20px']}
      align={'center'}
      w={'100%'}
      minH={['100px']}
    >
      <Image
        src={
          orderItem?.chainInfo?.image || '/blockchains/customize/ic-infa.svg'
        }
        w={['80px']}
        h={['80px']}
        fit={'cover'}
        borderRadius={'100%'}
      />
      <Flex flexDir={'column'} justify={'center'} align={'flex-start'} h="100%">
        <Text fontSize={['24px']} fontWeight={500} color={'#000'}>
          {`${chainNameFormated}`}
        </Text>
        {description && (
          <Text
            fontSize={['16px']}
            fontWeight={400}
            color={'#000'}
            opacity={0.7}
            overflow={'hidden'}
            whiteSpace={'wrap'}
            maxH={'100px'}
            w={'100%'}
            textOverflow={'ellipsis'}
          >
            {`${description || ''}`}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
