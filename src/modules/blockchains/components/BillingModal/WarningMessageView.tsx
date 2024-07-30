import { Flex, Text, Image } from '@chakra-ui/react';

interface IProps {}

const WarningMessageView = (props: IProps) => {
  return (
    <Flex
      mt={'10px'}
      flex={1}
      flexDir={'row'}
      px="16px"
      py="6px"
      gap={'8px'}
      bgColor={'#fff'}
      borderColor={'#FF7E21'}
      borderWidth={'1px'}
      borderRadius={'8px'}
    >
      <Image
        src={'/blockchains/customize/ic-bell-warning.svg'}
        w={'15px'}
        h={'auto'}
        objectFit={'contain'}
      />

      <Text fontSize={'14px'} fontWeight={500} color={'#FF7E21'}>
        Your Bitcoin L2 blockchain will be shut down if your BVM balance go to
        0. Please top up accordingly
      </Text>
    </Flex>
  );
};

export default WarningMessageView;
