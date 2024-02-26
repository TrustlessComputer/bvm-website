import { Flex, Image, Text } from '@chakra-ui/react';

import s from './styles.module.scss';

type TCardFiProps = {
  title: string;
  description: string;
  image: string;
  bgColorImage: string;
};

const CardFi = ({ ...props }: TCardFiProps) => {
  return (
    <Flex
      className={s.cardFiContainer}
      w={'100%'}
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      bgColor={'#fff'}
      alignItems={'flex-start'}
      justifyContent={['flex-start', 'space-between']}
      pb={['40px', '80px']}
      gap={['24px', '80px']}
    >
      <Image
        src={props.image}
        alt="GameFi_1"
        bgColor={props.bgColorImage}
        w={['100%', '500px']}
        py={'5px'}
        objectFit={'contain'}
        height={'300px'}
        className={s.cardFiImage}
      />
      <Flex
        flex={['', 1]}
        flexDir={{
          base: 'column',
          lg: 'column',
        }}
        alignItems={'flex-start'}
        justifyContent={'flex-start'}
        className={s.cardFiContent}
      >
        <Text
          fontSize={['24px', '32px']}
          fontWeight={400}
          lineHeight={['38.4px']}
          color={'#000'}
          className={s.cardFiContentTitle}
        >
          {props.title}
        </Text>
        <Text
          fontSize={['16px', '20px']}
          fontWeight={400}
          lineHeight={['24px', '36px']}
          color={'#000'}
          className={s.cardFiContentDes}
        >
          {props.description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardFi;
