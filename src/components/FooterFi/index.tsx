import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { BUY_TC_URL } from '@/config';
import s from './styles.module.scss';

type TFooterFiProps = {
  fTitle: string;
  sTitle?: string;
  description?: string;
  image: string;
  thumbnail: string;
  btnTitle: string;
  endFooter: string;
  href: string;
};

const FooterFi = ({ ...props }: TFooterFiProps) => {
  return (
    <Flex
      className={s.footerContainer}
      w={'100%'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      align={'center'}
      bgColor={'#000'}
      py={['40px', '80px']}
      alignItems={'center'}
      justifyContent={'center'}
      gap={{
        base: '40px',
        '2xl': '0px',
      }}
    >
      <Flex
        className={s.footerContent}
        flex={1}
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Image
          alignSelf={'center'}
          maxWidth="131"
          pb={['20px', '40px']}
          src={props.image}
          w={'100%'}
          h="auto"
        />
        <Text
          fontSize={['16px', '24px']}
          lineHeight={['32px', '36px']}
          fontWeight={400}
          textAlign={'center'}
          color={'#fff'}
          textTransform={'uppercase'}
          py={['12px', '0']}
        >
          {props.description}
        </Text>
        <Flex
          className={s.footerTitle}
          flex={1}
          alignItems={'center'}
          justify={'flex-center'}
          py={['16px', '20px']}
          flexDir={{
            base: 'column',
            lg: 'row',
          }}
        >
          <Text
            fontSize={['24px', '48px']}
            lineHeight={['40px', '57.6px']}
            fontWeight={400}
            textAlign={'center'}
            color={'#fff'}
            paddingRight={['0', '12px']}
          >
            {props.fTitle}
          </Text>
          <Text
            fontSize={['24px', '48px']}
            lineHeight={['40px', '57.6px']}
            fontWeight={400}
            textAlign={'center'}
            color={'#FA4E0E'}
          >
            {props.sTitle}
          </Text>
        </Flex>
        <Button
          className={s.footerBtn}
          bgColor={'#FA4E0E'}
          color={'#fff'}
          borderRadius={0}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          px={'24px'}
          py={'10px'}
          minW={['80%', '404px']}
          lineHeight={'19.09px'}
          height={'48px'}
          fontWeight={400}
          fontSize={'16px'}
          gap={['8px']}
          onClick={() => {
            window.open(props.href, '_blank');
          }}
          _hover={{
            opacity: 0.8,
          }}
        >
          {props.btnTitle}
        </Button>
        <Image
          className={s.footerThumbnail}
          alignSelf={'center'}
          maxW={['100%', '1600px']}
          src={props.thumbnail}
          py={['40px', '60px']}
          w={'100%'}
          objectFit={'cover'}
          h={['330px', 'auto']}
        />
        <Flex
          flex={1}
          alignItems={'center'}
          justifyContent={'flex-center'}
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
            {props.endFooter}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FooterFi;
