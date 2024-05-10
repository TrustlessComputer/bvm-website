import { useContactUs } from '@/Providers/ContactUsProvider/hook';
import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

export type Props = {};

const LeftView = React.memo((props: Props) => {
  const { showContactUsModal } = useContactUs();
  return (
    <Flex
      width={'50%'}
      direction={'column'}
      height={'auto'}
      top={0}
      position={'sticky'}
      alignSelf={'flex-start'}
    >
      <Image
        src={'/blockchains/customize/robot_build.png'}
        alt="robot_build"
        objectFit={'contain'}
      />
      <Flex align="center" justify="center" gap={'10px'}>
        <Image src={'/blockchains/customize/ic-message.svg'} />
        <Flex flexDir={'column'} align="center" fontSize="14px">
          <Text color={'#1c1c1c'}>Have questions about Bitcoin L2?</Text>
          <Text
            color={'#5b67f3'}
            _hover={{
              cursor: 'pointer',
            }}
            onClick={() => {
              showContactUsModal();
            }}
          >
            Talk to our team
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
});

export default LeftView;
