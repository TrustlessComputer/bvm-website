'use client';

import { OrderItem } from '@/stores/states/l2services/types';
import { Flex, Image, Text } from '@chakra-ui/react';
import useOrderMapper from '../../../hooks/useOrderMapper';
import { useWeb3Auth } from '@/Providers/Web3Auth_vs2/Web3Auth.hook';
import LivingStatus from '@/modules/blockchains/components/Body/L2Instance/LivingStatus';
import { useAppDispatch } from '@/stores/hooks';

type Props = {
  orderItem: OrderItem;
};

const ChainInforView = (props: Props) => {
  const { orderItem: item } = props;

  const mapper = useOrderMapper(item);

  return (
    <Flex flexDir={'row'} align={'center'} justifyItems={'center'} gap={'20px'}>
      {item.logoURL ? (
        <Image
          src={`${item.logoURL}`}
          w={['60px', '80px', '120px']}
          borderRadius={'4px'}
          h={'auto'}
          objectFit={'contain'}
        />
      ) : (
        <Image
          src={'/blockchains/customize/ic-infa.svg'}
          w={['30px', '35px', '40px']}
          h={'auto'}
          objectFit={'contain'}
        />
      )}
      <Text fontSize={['28px', '30px', '32px']} fontWeight={600} color={'#000'}>
        {`${item.chainName || '--'}`}
      </Text>

      <LivingStatus color={mapper.color || '#0ec00e'} />
    </Flex>
  );
};

export default ChainInforView;
