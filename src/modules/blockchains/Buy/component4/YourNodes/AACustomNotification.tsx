import { useAAModule } from '@/modules/blockchains/detail_v4/hook/useAAModule';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';

import { Flex, Image as ImageChakra, Text } from '@chakra-ui/react';

const AACustomNotification = () => {
  const { aaInstalledData, isDone } = useAAModule();

  const paymasterAddress = aaInstalledData?.aaPaymasterContract || '';

  if (!isDone) return null;

  return (
    <Flex
      bgColor={'#EEF5FF'}
      mx={'15px'}
      my={'5px'}
      p={'10px'}
      flexDir={'column'}
      gap={'5px'}
      borderRadius={'12px'}
    >
      <Text fontSize={'15px'} fontWeight={600}>
        Payment contract address:
      </Text>
      <Flex
        bgColor={'#fff'}
        px="10px"
        py={'5px'}
        gap={'10px'}
        flexDir={'row'}
        borderRadius={'12px'}
      >
        <Text>{`${paymasterAddress}`}</Text>
        <ImageChakra
          src={'/icons/ic-copy-red.svg'}
          w={['16px', '18px', '20px']}
          h={'auto'}
          objectFit={'contain'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
          onClick={() => {
            if (paymasterAddress) {
              copy(paymasterAddress);
              toast.success('Copied successully!');
            }
          }}
        />
      </Flex>
    </Flex>
  );
};

export default AACustomNotification;
