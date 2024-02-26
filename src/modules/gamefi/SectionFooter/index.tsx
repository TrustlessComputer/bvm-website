import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { BUY_TC_URL } from '@/config';
import s from './styles.module.scss'

export default function SectionFooter() {
  return (
    <div className={s.footer}>
      <Flex
        w={'100%'}
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
        align={'center'}
        bgColor={'#000'}
        px={['60px']}
        py={['30px']}
        minH={['300px']}
        borderRadius={'8px'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={{
          base: '40px',
          '2xl': '0px',
        }}
      >
        <Flex
          flex={1}
          flexDir={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image
            alignSelf={'center'}
            maxWidth="131"
            py={'20px'}
            src={`/gamefi/compress/arcade_gamefi.png`}
            w={'100%'}
            h="auto"
          />
          <Text
            fontSize={['16px', '24px']}
            lineHeight={'32px'}
            fontWeight={400}
            textAlign={'center'}
            color={'#fff'}
            textTransform={'uppercase'}
            py={['12px', '0']}
          >
            The first ever fully on-chain gaming blockchain on Bitcoin
          </Text>
          <Flex
            flex={1}
            alignItems={'center'}
            justify={'flex-center'}
            flexDir={{
              base: 'column',
              lg: 'row',
            }}
          >
            <Text
              fontSize={['24px', '48px']}
              lineHeight={['36px', '53px']}
              fontWeight={400}
              textAlign={'center'}
              color={'#fff'}
              paddingRight={['0', '12px']}
            >
              Ushering the new golden era of
            </Text>
            <Text
              fontSize={['24px', '48px']}
              lineHeight={['36px', '53px']}
              fontWeight={400}
              textAlign={'center'}
              color={'#FA4E0E'}
            >
              Gaming on Bitcoin
            </Text>
          </Flex>
          <Button
            marginTop={'5px'}
            bgColor={'#EF601B'}
            color={'#fff'}
            borderRadius={0}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            px={'24px'}
            py={'10px'}
            minW={['404px']}
            height={'48px'}
            fontWeight={400}
            fontSize={'16px'}
            my={'20px'}
            marginBottom={['40px', '50px']}
            gap={['8px']}
            onClick={() => {
              window.open(BUY_TC_URL, '_blank');
            }}
            _hover={{
              opacity: 0.8,
            }}
          >
            {`Need an example? Explore Bitcoin Arcade now!`}
          </Button>
          <Image
            alignSelf={'center'}
            maxW="1600px"
            src={`/gamefi/compress/banner_public_sale.png`}
            px={'20px'}
            w={'100%'}
            h="auto"
          />
          <Flex
            flex={1}
            alignItems={'center'}
            justifyContent={'flex-center'}
            py={['16px', '40px']}
            flexDir={'row'}
          >
            <Image
              alignSelf={'center'}
              maxW={'30px'}
              src={`/gamefi/compress/bvm.png`}
              w={'100%'}
              h="auto"
              paddingRight={'10px'}
            />
            <Text
              fontSize={['16px', '24px']}
              lineHeight={'36px'}
              fontWeight={400}
              textAlign={'center'}
              color={'#fff'}
            >
              Powered by Bitcoin Virtual Machine
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
