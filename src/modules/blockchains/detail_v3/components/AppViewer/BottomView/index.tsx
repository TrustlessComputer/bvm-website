'use client';

import { Flex, Text, Image } from '@chakra-ui/react';

type Props = {
  onShareClick: () => void;
  onExportClick: () => void;
};

const BottomView = (props: Props) => {
  const { onShareClick, onExportClick } = props;
  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      position={'absolute'}
      bottom={'10px'}
      gap={'10px'}
      px={'12px'}
    >
      <Flex
        borderRadius={'1000px'}
        bgColor={'#F2F2F2'}
        justify={'center'}
        align={'center'}
        gap={'8px'}
        p={'8px 16px'}
        onClick={onExportClick}
        _hover={{
          cursor: 'pointer',
          opacity: 0.7,
        }}
      >
        <Text
          fontSize={['14px']}
          fontWeight={400}
          textTransform={'uppercase'}
          color={'#555'}
        >
          Export
        </Text>
        <Image src="/icons/share_grey_ic.svg" w={'16px'} h={'16px'} />
      </Flex>

      <Flex
        borderRadius={'1000px'}
        bgColor={'#F2F2F2'}
        justify={'center'}
        align={'center'}
        gap={'8px'}
        p={'8px 16px'}
        onClick={onShareClick}
        _hover={{
          cursor: 'pointer',
          opacity: 0.7,
        }}
      >
        <Text
          fontSize={['14px']}
          fontWeight={400}
          textTransform={'uppercase'}
          color={'#555'}
        >
          Share
        </Text>
        <Image
          src="/icons/twitter_grey_ic.svg"
          w={'16px'}
          h={'16px'}
          fit={'cover'}
        />
      </Flex>
    </Flex>
  );
};

export default BottomView;
