import { Flex, Image as ImageChakra, Text } from '@chakra-ui/react';
import ResetButton from '../../component_v5/ResetButton';

interface BottomInforNodeProps {
  importantText?: string;
  text?: string;
}

const BottomInforNode = (props: BottomInforNodeProps) => {
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
        Paymaster contract address:
      </Text>
      <Flex
        bgColor={'#fff'}
        px="10px"
        py={'5px'}
        gap={'10px'}
        flexDir={'row'}
        borderRadius={'12px'}
      >
        <Text>{`AAAAAA`}</Text>
        <ImageChakra
          src={'/icons/ic-copy-red.svg'}
          w={['16px', '18px', '20px']}
          h={'auto'}
          objectFit={'contain'}
          _hover={{
            cursor: 'pointer',
            opacity: 0.8,
          }}
          onClick={() => {}}
        />
      </Flex>
    </Flex>
  );
};

export default BottomInforNode;
