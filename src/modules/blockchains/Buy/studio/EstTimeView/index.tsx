import { useChainProvider } from '@/modules/blockchains/detail_v4/provider/ChainProvider.hook';
import { Flex, Image, Text } from '@chakra-ui/react';
import useFormChain from '../../hooks/useFormChain';

import { isEmpty } from 'lodash';

export const EstTimeView = () => {
  const { isUpdateFlow } = useChainProvider();
  const { getCurrentFieldFromChain } = useFormChain();

  if (isUpdateFlow) return null;

  const data = getCurrentFieldFromChain('layers');
  const networkData = getCurrentFieldFromChain('network');

  if (!networkData) {
    return null;
  }

  const isTestnet =
    networkData.options[0] && networkData?.options[0].key === 'testnet';

  // console.log(' --- ', {
  //   isTestnet,
  //   networkData,
  //   data,
  //   option: networkData.options[0],
  //   key: networkData?.options[0].key,
  // });

  let estTimeStr;
  if (isTestnet) {
    estTimeStr = data?.options[0] && data?.options[0].deployTimeTestnet;
  } else {
    estTimeStr = data?.options[0] && data?.options[0].deployTime;
  }

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
        <Text fontSize={['18px']} fontWeight={600} color={'#333'}>
          {estTimeStr}
        </Text>
      </Flex>
      <Text fontSize={['13px']} fontWeight={500} color={'#777'}>
        Deploy time
      </Text>
    </Flex>
  );
};
