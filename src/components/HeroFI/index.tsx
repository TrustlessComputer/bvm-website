import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { BUY_TC_URL } from '@/config';
import s from './styles.module.scss';

type THeroFiProps = {
  mainTitle: string;
  title: string;
  subTitle: string;
  btnTitle: string;
  subBtnTitle: string;
  subBtnIcon: string;
  heroThumbnail: string;
};

const HeroFi = ({ ...props }: THeroFiProps) => {
  return (
    <Flex
      w={'100%'}
      minH={['100vh', '100%']}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      align={['center', 'start']}
      bgColor={'#f6f6f6'}
      py={['60px', '80px']}
      gap={{
        base: '40px',
        '2xl': '0px',
      }}
      className={s.heroContainer}
    >
      <Flex
        className={s.heroContent}
        flexDir={'column'}
        flex={['', 1]}
        alignItems={{
          base: 'center',
          lg: 'flex-start',
        }}
        gap={['12px', '18px']}
      >
        <Text
          fontSize={['16px', '20px']}
          lineHeight={['20px', '24px']}
          fontWeight={400}
          color={'#000'}
        >
          {props.mainTitle}
        </Text>
        <Text
          fontSize={['24px', '40px']}
          textAlign={['center', 'start']}
          lineHeight={'48px'}
          fontWeight={400}
          color={'#000'}
        >
          {props.title}
        </Text>
        <Text
          fontSize={['16px', '20px']}
          lineHeight={['20px', '24px']}
          fontWeight={400}
          color={'#000'}
          textAlign={'center'}
        >
          {props.subTitle}
        </Text>
        <Button
          bgColor={'#FA4E0E'}
          color={'#fff'}
          borderRadius={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'24px'}
          py={'10px'}
          my={['10px', '0']}
          lineHeight={'19.09px'}
          minW={['100%', '285px']}
          height={'48px'}
          fontWeight={400}
          fontSize={'16px'}
          letterSpacing={'1%'}
          gap={['8px']}
          onClick={() => {
            window.open(BUY_TC_URL, '_blank');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          {props.btnTitle}
        </Button>
        <Button
          color={'#FA4E0E'}
          borderRadius={0}
          display={'flex'}
          justifyContent={['center', 'start']}
          alignItems={'center'}
          px={'0'}
          minW={['auto', '376px']}
          height={'48px'}
          fontWeight={400}
          lineHeight={'19.09px'}
          fontSize={'16px'}
          letterSpacing={'1%'}
          gap={['8px']}
          onClick={() => {
            window.open(BUY_TC_URL, '_blank');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          <>
            {props.subBtnTitle}
            <Image
              alignSelf={'center'}
              maxWidth={'20px'}
              maxHeight={'20px'}
              src={props.subBtnIcon}
              w={'100%'}
              h="auto"
            />
          </>
        </Button>
      </Flex>
      <Flex justify={'flex-end'}>
        <Image
          alignSelf={'center'}
          objectFit={'cover'}
          maxWidth={['100%', '780px']}
          src={props.heroThumbnail}
          w={'100%'}
          h={['340px', '440px']}
        />
      </Flex>
    </Flex>
  );
};

export default HeroFi;
