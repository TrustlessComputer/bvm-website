import LivingStatus from '@/modules/blockchains/components/Body_v2/L2Instance/LivingStatus';
import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import useOrderMapper from '@/modules/blockchains/hooks/useOrderMapper';
import { Flex, Image, Text } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useRouter } from 'next/navigation';

const ChainInforView = (): ReactElement => {
  const { order } = useChainProvider();
  const router = useRouter();
  // const mapper = useOrderMapper(order);
  return (
    <Flex flexDir={'row'} align={'center'} justifyItems={'center'} gap={'20px'}>
      <Image
        src={`${order?.logoURL || '/blockchains/customize/ic-infa.svg'}`}
        w={['30px', '35px', '40px']}
        borderRadius={'100%'}
        h={'auto'}
        objectFit={'contain'}
      />

      <Text fontSize={['22px', '24px', '28px']} fontWeight={600} color={'#000'}>
        {`${order?.chainName || '--'}`}
      </Text>

      <Image
        src={`/icons/pencil_edit_grey.svg`}
        fit={'contain'}
        maxW={'24px'}
        maxH={'24px'}
        _hover={{
          cursor: 'pointer',
          opacity: 0.8,
        }}
        onClick={(event: any) => {
          if (event.stopPropagation) event.stopPropagation();
          router.push(`/domain/${order?.chainId}`);
        }}
      />

      {/* <LivingStatus color={mapper.color || '#0ec00e'} /> */}
    </Flex>
  );
};

export default React.memo(ChainInforView);
