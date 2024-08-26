import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { Flex, Image, Text } from '@chakra-ui/react';
import useFormChain from '../../hooks/useFormChain';

import { isEmpty } from 'lodash';

export const EstTimeView = () => {
  const { isUpdateFlow } = useChainProvider();
  const { getCurrentFieldFromChain } = useFormChain();

  if (isUpdateFlow) return null;

  const data = getCurrentFieldFromChain('layers');
  const estTimeStr = data?.options[0] && data?.options[0].deployTime;

  if (!estTimeStr || isEmpty(estTimeStr)) return null;

  return (
    <Flex flexDir={'column'} align={'flex-start'}>
      <Flex flexDir={'row'} align={'center'} gap={'4px'}>
        <Image
          ml={'-2px'}
          src="/icons/studio-module/est-time-ic.svg"
          w={'25px'}
          h={'25px'}
        ></Image>
        <Text fontSize={['18px']} fontWeight={500} color={'#333'}>
          {estTimeStr}
        </Text>
      </Flex>
      <Text fontSize={['13px']} fontWeight={400} color={'#777'}>
        Est completion time
      </Text>
    </Flex>
  );
};
